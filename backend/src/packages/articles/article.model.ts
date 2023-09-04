import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';

import { UserDetailsModel } from '../users/user-details.model.js';

class ArticleModel extends AbstractModel {
  public 'title': string;
  public 'text': string;
  public 'userId': number;
  public 'promptId': number | null;
  public 'genreId': number | null;
  public 'publishedAt': string | null;

  public static override get tableName(): string {
    return DatabaseTableName.ARTICLES;
  }

  public static get relationMappings(): RelationMappings {
    return {
      author: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: composeDatabaseRelationPath<ArticleModel>(
            DatabaseTableName.ARTICLES,
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

export { ArticleModel };
