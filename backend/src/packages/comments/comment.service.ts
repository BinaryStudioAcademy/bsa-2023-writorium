import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { ForbiddenError } from '~/libs/packages/exceptions/exceptions.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { CommentEntity } from './comment.entity.js';
import { type CommentRepository } from './comment.repository.js';
import {
  type CommentCreateDto,
  type CommentGetAllResponseDto,
  type CommentUpdateRequestDto,
  type CommentWithRelationsResponseDto,
} from './libs/types/types.js';

class CommentService implements IService {
  private commentRepository: CommentRepository;

  public constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
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
