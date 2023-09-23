import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import { type ReferenceTable } from './libs/types/types.js';

class AchievementModel extends AbstractModel {
  public 'key': string;
  public 'name': string;
  public 'description': string;
  public 'breakpoint': number;
  public 'referenceTable': ReferenceTable;

  public static override get tableName(): string {
    return DatabaseTableName.ACHIEVEMENTS;
  }
}

export { AchievementModel };
