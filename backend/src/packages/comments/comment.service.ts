import { HttpError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { HttpCode } from '~/libs/packages/http/http.js';

import { CommentEntity } from './comment.entity.js';
import { type CommentRepository } from './comment.repository.js';
import {
  type CommentBaseResponseDto,
  type CommentCreateDto,
  type CommentGetAllResponseDto,
  type CommentUpdateDto,
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
      items: items.map((it) => it.toObject()),
    };
  }

  public async find(id: number): Promise<CommentBaseResponseDto | null> {
    const comment = await this.commentRepository.find(id);

    if (!comment) {
      return null;
    }

    return comment.toObject();
  }

  public async create(
    payload: CommentCreateDto,
  ): Promise<CommentBaseResponseDto> {
    const comment = await this.commentRepository.create(
      CommentEntity.initializeNew({
        text: payload.text,
        userId: payload.userId,
        articleId: payload.articleId,
      }),
    );

    return comment.toObject();
  }

  public async update(
    id: number,
    payload: CommentUpdateDto,
  ): Promise<CommentBaseResponseDto> {
    const comment = await this.find(id);

    if (!comment) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: `Comment with id ${id} not found`,
      });
    }

    if (comment.userId !== payload.userId) {
      throw new HttpError({
        status: HttpCode.FORBIDDEN,
        message: `User with id "${payload.userId}" has no rights to update this comment`,
      });
    }

    const updatedComment = await this.commentRepository.update(
      CommentEntity.initialize({
        ...comment,
        text: payload.text,
      }),
    );

    return updatedComment.toObject();
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { CommentService };
