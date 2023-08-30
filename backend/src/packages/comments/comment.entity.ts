import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type CommentEntityType } from './libs/types/types.js';

type CommentEntityPayloadType = Omit<CommentEntityType, 'id'>;

class CommentEntity implements IEntity {
  private 'id': number | null;
  private 'text': string;
  private 'userId': number;
  private 'articleId': number;
  private 'publishedAt': string | null;

  private constructor({
    id,
    text,
    userId,
    articleId,
    publishedAt,
  }: WithNullableKeys<CommentEntityType, 'id'>) {
    this.id = id;
    this.text = text;
    this.userId = userId;
    this.articleId = articleId;
    this.publishedAt = publishedAt;
  }

  public static initialize({
    id,
    text,
    userId,
    articleId,
    publishedAt,
  }: CommentEntityType): CommentEntity {
    return new CommentEntity({
      id,
      text,
      userId,
      articleId,
      publishedAt,
    });
  }

  public static initializeNew({
    text,
    userId,
    articleId,
    publishedAt,
  }: CommentEntityPayloadType): CommentEntity {
    return new CommentEntity({
      id: null,
      text,
      userId,
      articleId,
      publishedAt,
    });
  }

  public toObject(): CommentEntityType {
    return {
      id: this.id as number,
      text: this.text,
      userId: this.userId,
      articleId: this.articleId,
      publishedAt: this.publishedAt,
    };
  }

  public toNewObject(): CommentEntityPayloadType {
    return {
      text: this.text,
      userId: this.userId,
      articleId: this.articleId,
      publishedAt: this.publishedAt,
    };
  }
}

export { CommentEntity };
