import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type ArticleView } from './libs/types/types.js';

type ArticleViewEntityPayload = Omit<ArticleView, 'id'>;

class ArticleViewEntity implements IEntity {
  private 'id': number | null;

  private 'articleId': number;

  private 'viewedById': number;

  private constructor({
    id,
    articleId,
    viewedById,
  }: WithNullableKeys<ArticleView, 'id'>) {
    this.id = id;
    this.articleId = articleId;
    this.viewedById = viewedById;
  }

  public static initialize({
    id,
    articleId,
    viewedById,
  }: ArticleView): ArticleViewEntity {
    return new ArticleViewEntity({
      id,
      articleId,
      viewedById,
    });
  }

  public static initializeNew({
    articleId,
    viewedById,
  }: ArticleViewEntityPayload): ArticleViewEntity {
    return new ArticleViewEntity({
      id: null,
      articleId,
      viewedById,
    });
  }

  public toObject(): ArticleView {
    return {
      id: this.id as number,
      articleId: this.articleId,
      viewedById: this.viewedById,
    };
  }

  public toNewObject(): ArticleViewEntityPayload {
    return {
      articleId: this.articleId,
      viewedById: this.viewedById,
    };
  }
}

export { ArticleViewEntity };