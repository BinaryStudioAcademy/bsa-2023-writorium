import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';

import { UserModel } from '../users/users.js';

class CommentModel extends AbstractModel {
  public 'text': string;
  public 'userId': number;
  public 'articleId': number;

  public static override get tableName(): string {
    return DatabaseTableName.COMMENTS;
  }
  public static get relationMappings(): RelationMappings {
    return {
      author: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: composeDatabaseRelationPath<CommentModel>(
            DatabaseTableName.COMMENTS,
            'userId',
          ),
          to: composeDatabaseRelationPath<UserModel>(
            DatabaseTableName.USERS,
            'id',
          ),
        },
      },
    };
  }
}

export { CommentModel };
