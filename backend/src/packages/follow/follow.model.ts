import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class FollowModel extends AbstractModel {
  public 'userId': number;

  public 'authorId': number;

  public static override get tableName(): string {
    return DatabaseTableName.USER_FOLLOWING_AUTHORS;
  }
}

export { FollowModel };
