import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class UserAchievementModel extends AbstractModel {
  public 'userId': number;
  public 'achievementId': number;

  public static override get tableName(): string {
    return DatabaseTableName.USERS_ACHIEVEMENTS;
  }
}

export { UserAchievementModel };
