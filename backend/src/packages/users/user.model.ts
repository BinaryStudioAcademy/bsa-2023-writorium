import { Model, type RelationType } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import { UserDetailsModel } from './user-details.model.js';

class UserModel extends AbstractModel {
  public 'email': string;

  public 'passwordHash': string;

  public 'passwordSalt': string;

  public 'firstName': string;

  public 'lastName': string;

  public 'userDetails': UserDetailsModel;

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }

  public static get relationMappings(): {
    userDetails: {
      relation: RelationType;
      modelClass: typeof UserDetailsModel;
      join: { from: string; to: string };
    };
  } {
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
