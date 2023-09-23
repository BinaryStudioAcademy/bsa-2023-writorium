import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { ForbiddenError } from '~/libs/packages/exceptions/exceptions.js';
import { SocketNamespace, SocketRoom } from '~/libs/packages/socket/socket.js';
import { type SocketService } from '~/libs/packages/socket/socket.package.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { type AchievementService } from '../achievements/achievement.service.js';
import { CommentEntity } from './comment.entity.js';
import { type CommentRepository } from './comment.repository.js';
import { CommentsSocketEvent } from './libs/enums/enums.js';
import {
  type CommentCreateDto,
  type CommentGetAllResponseDto,
  type CommentsSocketEventPayload,
  type CommentUpdateRequestDto,
  type CommentWithRelationsResponseDto,
} from './libs/types/types.js';

type Constructor = {
  commentRepository: CommentRepository;
  socketService: SocketService;
  achievementService: AchievementService;
};

class CommentService implements IService {
  private commentRepository: CommentRepository;
  private achievementService: AchievementService;
  private socketService: SocketService;

  public constructor({
    commentRepository,
    socketService,
    achievementService,
  }: Constructor) {
    this.commentRepository = commentRepository;
    this.socketService = socketService;
    this.achievementService = achievementService;
  }

  public findAll(): Promise<{ items: unknown[] }> {
    return Promise.resolve({ items: [] });
  }

  public async findAllByArticleId(
    articleId: number,
  ): Promise<CommentGetAllResponseDto | []> {
    const items = await this.commentRepository.findAllByArticleId(articleId);

    return {
      items: items.map((it) => it.toObjectWithRelations()),
    };
  }

  public async find(
    id: number,
  ): Promise<CommentWithRelationsResponseDto | null> {
    const comment = await this.commentRepository.find(id);

    if (!comment) {
      return null;
    }

    return comment.toObjectWithRelations();
  }

  public async create(
    payload: CommentCreateDto,
  ): Promise<CommentWithRelationsResponseDto> {
    const comment = await this.commentRepository.create(
      CommentEntity.initializeNew({
        text: payload.text,
        userId: payload.userId,
        articleId: payload.articleId,
      }),
    );

    const socketEventPayload: CommentsSocketEventPayload[typeof CommentsSocketEvent.NEW_COMMENT] =
      comment.toObjectWithRelations();

    this.socketService.io
      .of(SocketNamespace.COMMENTS)
      .to(
        configureString(SocketRoom.ARTICLE_$ID, {
          id: String(payload.articleId),
        }),
      )
      .emit(CommentsSocketEvent.NEW_COMMENT, socketEventPayload);

    const countOfOwnComments =
      await this.commentRepository.countCommentsByUserId(payload.userId);

    await this.achievementService.checkAchievement({
      userId: payload.userId,
      countOfItems: countOfOwnComments,
      referenceTable: DatabaseTableName.COMMENTS,
    });

    return comment.toObjectWithRelations();
  }

  public async update(
    id: number,
    {
      payload,
      userId,
    }: { payload: CommentUpdateRequestDto; userId: UserAuthResponseDto['id'] },
  ): Promise<CommentWithRelationsResponseDto> {
    const comment = await this.find(id);

    if (!comment) {
      throw new ApplicationError({
        message: `Comment with id ${id} not found`,
      });
    }

    if (comment.userId !== userId) {
      throw new ForbiddenError(
        `User with id "${userId}" has no rights to update this comment`,
      );
    }

    const updatedComment = await this.commentRepository.update(
      CommentEntity.initialize({
        ...comment,
        text: payload.text,
      }),
    );

    return updatedComment.toObjectWithRelations();
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { CommentService };
