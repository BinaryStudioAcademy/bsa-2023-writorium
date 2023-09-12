import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';

import { ArticleReactionModel } from '../article-reactions/article-reaction.model.js';
import { FileModel } from '../files/file.model.js';
import { GenreModel } from '../genres/genre.model.js';
import { PromptModel } from '../prompts/prompt.model.js';
import { UserDetailsModel } from '../users/user-details.model.js';
import { type ReactionResponseDto } from './libs/types/types.js';

class ArticleModel extends AbstractModel {
  public 'title': string;
  public 'text': string;
  public 'userId': number;
  public 'promptId': number | null;
  public 'genreId': number | null;
  public 'publishedAt': string | null;
  public 'genre': GenreModel;
  public 'prompt': PromptModel;
  public 'reactions': ReactionResponseDto[];
  public 'readTime': number | null;
  public 'coverId': number | null;
  public 'cover': FileModel | null;

  public static override get tableName(): string {
    return DatabaseTableName.ARTICLES;
  }

  public static get relationMappings(): RelationMappings {
    return {
      reactions: {
        relation: Model.HasManyRelation,
        modelClass: ArticleReactionModel,
        join: {
          from: composeDatabaseRelationPath<ArticleModel>(
            DatabaseTableName.ARTICLES,
            'id',
          ),
          to: composeDatabaseRelationPath<ArticleReactionModel>(
            DatabaseTableName.ARTICLE_REACTIONS,
            'articleId',
          ),
        },
      },
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
      prompt: {
        relation: Model.HasOneRelation,
        modelClass: PromptModel,
        join: {
          from: composeDatabaseRelationPath<ArticleModel>(
            DatabaseTableName.ARTICLES,
            'promptId',
          ),
          to: composeDatabaseRelationPath<PromptModel>(
            DatabaseTableName.PROMPTS,
            'id',
          ),
        },
      },
      genre: {
        relation: Model.HasOneRelation,
        modelClass: GenreModel,
        join: {
          from: composeDatabaseRelationPath<ArticleModel>(
            DatabaseTableName.ARTICLES,
            'genreId',
          ),
          to: composeDatabaseRelationPath<GenreModel>(
            DatabaseTableName.GENRES,
            'id',
          ),
        },
      },
      cover: {
        relation: Model.HasOneRelation,
        modelClass: FileModel,
        join: {
          from: composeDatabaseRelationPath<ArticleModel>(
            DatabaseTableName.ARTICLES,
            'coverId',
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

export { ArticleModel };
