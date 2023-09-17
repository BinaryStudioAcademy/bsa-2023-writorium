import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';
import { FileModel } from '~/packages/files/file.model.js';

class UserDetailsModel extends AbstractModel {
  public 'firstName': string;

  public 'lastName': string;

  public 'userId': number;

  public 'avatarId': number | null;

  public 'avatar': FileModel | null;

  public static override get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      avatar: {
        relation: Model.HasOneRelation,
        modelClass: FileModel,
        join: {
          from: composeDatabaseRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'avatarId',
          ),
          to: composeDatabaseRelationPath<FileModel>(
            DatabaseTableName.FILES,
            'id',
          ),
        },
      },
    };
  }
}

export { UserDetailsModel };
