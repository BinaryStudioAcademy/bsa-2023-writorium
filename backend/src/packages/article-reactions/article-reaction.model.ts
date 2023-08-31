import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';

import { ArticleModel } from '../articles/article.model.js';
import { UserModel } from '../users/user.model.js';

class ArticleReactionModel extends AbstractModel {
  public 'userId': number;
  public 'articleId': number;
  public 'isLike': boolean;

  public static override get tableName(): string {
    return DatabaseTableName.ARTICLE_REACTIONS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      article: {
        relation: Model.HasOneRelation,
        modelClass: ArticleModel,
        join: {
          from: composeDatabaseRelationPath<ArticleReactionModel>(
            DatabaseTableName.ARTICLE_REACTIONS,
            'articleId',
          ),
          to: composeDatabaseRelationPath(DatabaseTableName.ARTICLES, 'id'),
        },
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: composeDatabaseRelationPath<ArticleReactionModel>(
            DatabaseTableName.ARTICLE_REACTIONS,
            'userId',
          ),
          to: composeDatabaseRelationPath(DatabaseTableName.USERS, 'id'),
        },
      },
    };
  }
}

export { ArticleReactionModel };
