import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type CommentEntityType } from './libs/types/types.js';

type CommentEntityPayloadType = Omit<CommentEntityType, 'id' | 'createdAt'>;

class CommentEntity implements IEntity {
  private 'id': number | null;
  private 'text': string;
  private 'userId': number;
  private 'articleId': number;
  private 'createdAt': string | undefined;

  private constructor({
    id,
    text,
    userId,
    articleId,
    createdAt,
  }: WithNullableKeys<CommentEntityType, 'id'>) {
    this.id = id;
    this.text = text;
    this.userId = userId;
    this.articleId = articleId;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    text,
    userId,
    articleId,
    createdAt,
  }: CommentEntityType): CommentEntity {
    return new CommentEntity({
      id,
      text,
      userId,
      articleId,
      createdAt,
    });
  }

  public static initializeNew({
    text,
    userId,
    articleId,
  }: CommentEntityPayloadType): CommentEntity {
    return new CommentEntity({
      id: null,
      text,
      userId,
      articleId,
      createdAt: '',
    });
  }

  public toObject(): CommentEntityType {
    return {
      id: this.id as number,
      text: this.text,
      userId: this.userId,
      articleId: this.articleId,
      createdAt: this.createdAt,
    };
  }

  public toNewObject(): CommentEntityPayloadType {
    return {
      text: this.text,
      userId: this.userId,
      articleId: this.articleId,
    };
  }
}

export { CommentEntity };
