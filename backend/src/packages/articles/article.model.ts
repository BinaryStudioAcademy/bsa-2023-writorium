import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';

import { ArticleReactionModel } from '../article-reactions/article-reaction.model.js';
import { UserModel } from '../users/user.model.js';

class ArticleModel extends AbstractModel {
  public 'title': string;
  public 'text': string;
  public 'userId': number;
  public 'promptId': number | null;
  public 'genreId': number;
  public 'publishedAt': string | null;

  public static override get tableName(): string {
    return DatabaseTableName.ARTICLES;
  }

  public static get relationMappings(): RelationMappings {
    return {
      articleRactions: {
        relation: Model.HasManyRelation,
        modelClass: ArticleReactionModel,
        join: {
          from: composeDatabaseRelationPath('articles', 'id'),
          to: composeDatabaseRelationPath<ArticleReactionModel>(
            'article_reactions',
            'articleId',
          ),
        },
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: composeDatabaseRelationPath<ArticleModel>('articles', 'userId'),
          to: composeDatabaseRelationPath('users', 'id'),
        },
      },
    };
  }
}

export { ArticleModel };
