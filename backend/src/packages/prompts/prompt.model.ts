import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { composeDatabaseRelationPath } from '~/libs/packages/database/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import { GenreModel } from '../genres/genre.model.js';
import { type PromptType } from './libs/enums/enums.js';

class PromptModel extends AbstractModel {
  public 'character': string | null;
  public 'setting': string | null;
  public 'situation': string | null;
  public 'prop': string | null;
  public 'type': ValueOf<typeof PromptType>;
  public 'genreId': number | null;

  public static override get tableName(): string {
    return DatabaseTableName.PROMPTS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      genre: {
        relation: Model.HasOneRelation,
        modelClass: GenreModel,
        join: {
          from: composeDatabaseRelationPath<PromptModel>(
            DatabaseTableName.PROMPTS,
            'genreId',
          ),
          to: composeDatabaseRelationPath<GenreModel>(
            DatabaseTableName.GENRES,
            'id',
          ),
        },
      },
    };
  }
}

export { PromptModel };
