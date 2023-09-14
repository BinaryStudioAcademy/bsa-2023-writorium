import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';
import { UserDetailsModel } from '~/packages/users/user-details.model.js';

class CommentModel extends AbstractModel {
  public 'text': string;
  public 'userId': number;
  public 'articleId': number;
  public 'author': UserDetailsModel;

  public static override get tableName(): string {
    return DatabaseTableName.COMMENTS;
  }
  public static get relationMappings(): RelationMappings {
    return {
      author: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: composeDatabaseRelationPath<CommentModel>(
            DatabaseTableName.COMMENTS,
            'userId',
          ),
          to: composeDatabaseRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'userId',
          ),
        },
      },
    };
  }
}

export { CommentModel };
