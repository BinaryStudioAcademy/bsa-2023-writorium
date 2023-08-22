import { type RelationMappings } from 'objection';
import { Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import { UserModel } from './users.js';

class UserDetailsModel extends AbstractModel {
  public 'firstName': string;

  public 'lastName': string;

  public 'userId': number;

  public static override get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseTableName.USER_DETAILS}.userId`,
          to: `${DatabaseTableName.USERS}.id`,
        },
      },
    };
  }
}

export { UserDetailsModel };
