import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';

import { ArticleModel } from '../articles/article.model.js';
import { UserModel } from './user.model.js';

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
          from: composeDatabaseRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'userId',
          ),
          to: composeDatabaseRelationPath<UserModel>(
            DatabaseTableName.USERS,
            'id',
          ),
        },
      },
      articles: {
        relation: Model.HasOneRelation,
        modelClass: ArticleModel,
        join: {
          from: composeDatabaseRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'userId',
          ),
          to: composeDatabaseRelationPath<ArticleModel>(
            DatabaseTableName.ARTICLES,
            'userId',
          ),
        },
      },
    };
  }
}

export { UserDetailsModel };
