import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class AchievementModel extends AbstractModel {
  public 'key': string;
  public 'name': string;
  public 'description': string;
  public 'breakpoint': number;
  public 'referenceTable': string;

  public static override get tableName(): string {
    return DatabaseTableName.ACHIEVEMENTS;
  }
}

export { AchievementModel };
