import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class ArticleViewModel extends AbstractModel {
  public 'articleId': number;

  public 'viewedById': number;

  public static override get tableName(): string {
    return DatabaseTableName.ARTICLE_VIEWS;
  }
}

export { ArticleViewModel };
