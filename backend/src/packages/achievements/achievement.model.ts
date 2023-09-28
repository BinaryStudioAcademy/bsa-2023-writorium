import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import {
  type AchievementDescription,
  type ReferenceTable,
} from './libs/types/types.js';

class AchievementModel extends AbstractModel {
  public 'key': string;
  public 'name': string;
  public 'description': AchievementDescription;
  public 'breakpoint': number;
  public 'referenceTable': ReferenceTable;

  public static override get tableName(): string {
    return DatabaseTableName.ACHIEVEMENTS;
  }
}

export { AchievementModel };
