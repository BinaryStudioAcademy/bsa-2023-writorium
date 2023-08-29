import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import { UserDetailsModel } from './user-details.model.js';

class UserModel extends AbstractModel {
  public 'email': string;

  public 'passwordHash': string;

  public 'passwordSalt': string;

  public 'userDetails': UserDetailsModel;

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      userDetails: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: `${DatabaseTableName.USERS}.id`,
          to: `${DatabaseTableName.USER_DETAILS}.userId`,
        },
      },
    };
  }
}

export { UserModel };
