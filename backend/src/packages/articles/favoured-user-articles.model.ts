import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class FavouredUserArticlesModel extends AbstractModel {
  public 'userId': number;

  public 'articleId': number;

  public static override get tableName(): string {
    return DatabaseTableName.FAVOURED_USER_ARTICLES;
  }
}

export { FavouredUserArticlesModel };
