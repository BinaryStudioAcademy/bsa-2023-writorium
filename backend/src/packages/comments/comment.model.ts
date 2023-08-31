import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class CommentModel extends AbstractModel {
  public 'text': string;
  public 'userId': number;
  public 'articleId': number;

  public static override get tableName(): string {
    return DatabaseTableName.COMMENTS;
  }
}

export { CommentModel };
