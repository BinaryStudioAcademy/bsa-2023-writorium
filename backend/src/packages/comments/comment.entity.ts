import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';
import { type UserDetailsResponseDto } from '~/packages/users/libs/types/types.js';

import {
  type CommentEntityInstance,
  type CommentWithRelationsResponseDto,
} from './libs/types/types.js';

type CommentEntityPayload = Omit<CommentEntityInstance, 'id' | 'createdAt'>;

class CommentEntity implements IEntity {
  private 'id': number | null;
  private 'text': string;
  private 'userId': number;
  private 'articleId': number;
  private 'createdAt': string | null;
  private 'author': UserDetailsResponseDto | null;

  private constructor({
    id,
    text,
    userId,
    articleId,
    createdAt,
    author,
  }: WithNullableKeys<
    CommentWithRelationsResponseDto,
    'id' | 'createdAt' | 'author'
  >) {
    this.id = id;
    this.text = text;
    this.userId = userId;
    this.articleId = articleId;
    this.createdAt = createdAt;
    this.author = author;
  }

  public static initialize({
    id,
    text,
    userId,
    articleId,
    createdAt,
    author,
  }: CommentWithRelationsResponseDto): CommentEntity {
    return new CommentEntity({
      id,
      text,
      userId,
      articleId,
      createdAt,
      author,
    });
  }

  public static initializeNew({
    text,
    userId,
    articleId,
  }: CommentEntityPayload): CommentEntity {
    return new CommentEntity({
      id: null,
      text,
      userId,
      articleId,
      createdAt: null,
      author: null,
    });
  }

  public toObject(): CommentEntityInstance {
    return {
      id: this.id as number,
      text: this.text,
      userId: this.userId,
      articleId: this.articleId,
      createdAt: this.createdAt as string,
    };
  }

  public toObjectWithRelations(): CommentWithRelationsResponseDto {
    return {
      id: this.id as number,
      text: this.text,
      userId: this.userId,
      articleId: this.articleId,
      createdAt: this.createdAt as string,
      author: this.author as UserDetailsResponseDto,
    };
  }

  public toNewObject(): CommentEntityPayload {
    return {
      text: this.text,
      userId: this.userId,
      articleId: this.articleId,
    };
  }
}

export { CommentEntity };
