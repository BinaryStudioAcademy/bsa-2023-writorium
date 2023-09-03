import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';
import { UserDetailsModel } from '~/packages/users/user-details.model.js';

class FileModel extends AbstractModel {
  public 'url': string;

  public static override get tableName(): string {
    return DatabaseTableName.FILES;
  }

  public static get relationMappings(): RelationMappings {
    return {
      userDetails: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: composeDatabaseRelationPath<FileModel>(
            DatabaseTableName.FILES,
            'id',
          ),
          to: composeDatabaseRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'avatarId',
          ),
        },
      },
    };
  }
}

export { FileModel };
