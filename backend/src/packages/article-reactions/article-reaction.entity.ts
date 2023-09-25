import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type ArticleReactionEntityInstance } from './libs/types/types.js';

class ArticleReactionEntity implements IEntity {
  private 'id': number | null;
  private 'isLike': boolean;
  private 'userId': number;
  private 'articleId': number;

  private constructor({
    id,
    isLike,
    userId,
    articleId,
  }: WithNullableKeys<ArticleReactionEntityInstance, 'id'>) {
    this.id = id;
    this.isLike = isLike;
    this.userId = userId;
    this.articleId = articleId;
  }

  public static initialize({
    id,
    isLike,
    userId,
    articleId,
  }: ArticleReactionEntityInstance): ArticleReactionEntity {
    return new ArticleReactionEntity({
      id,
      isLike,
      userId,
      articleId,
    });
  }

  public static initializeNew({
    isLike,
    userId,
    articleId,
  }: Omit<ArticleReactionEntityInstance, 'id'>): ArticleReactionEntity {
    return new ArticleReactionEntity({
      id: null,
      isLike,
      userId,
      articleId,
    });
  }

  public toObject(): ArticleReactionEntityInstance {
    return {
      id: this.id as number,
      isLike: this.isLike,
      userId: this.userId,
      articleId: this.articleId,
    };
  }

  public toNewObject(): Omit<ArticleReactionEntityInstance, 'id'> {
    return {
      isLike: this.isLike,
      userId: this.userId,
      articleId: this.articleId,
    };
  }
}

export { ArticleReactionEntity };
