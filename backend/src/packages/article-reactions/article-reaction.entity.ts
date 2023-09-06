import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type ArticleReactionEntityType } from './libs/types/types.js';

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
  }: WithNullableKeys<ArticleReactionEntityType, 'id'>) {
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
  }: ArticleReactionEntityType): ArticleReactionEntity {
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
  }: Omit<ArticleReactionEntityType, 'id'>): ArticleReactionEntity {
    return new ArticleReactionEntity({
      id: null,
      isLike,
      userId,
      articleId,
    });
  }

  public toObject(): ArticleReactionEntityType {
    return {
      id: this.id as number,
      isLike: this.isLike,
      userId: this.userId,
      articleId: this.articleId,
    };
  }

  public toNewObject(): Omit<ArticleReactionEntityType, 'id'> {
    return {
      isLike: this.isLike,
      userId: this.userId,
      articleId: this.articleId,
    };
  }
}

export { ArticleReactionEntity };
