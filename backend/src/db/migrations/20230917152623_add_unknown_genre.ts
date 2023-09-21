import { type Knex } from 'knex';

const TABLE_NAME = 'genres';

const GENRE_KEY_COLUMN_NAME = 'key';

const UNKNOWN_GENRE = { key: 'unknown', name: 'Unknown' } as const;

const up = async (knex: Knex): Promise<number[]> => {
  return await knex(TABLE_NAME)
    .insert(UNKNOWN_GENRE)
    .onConflict(GENRE_KEY_COLUMN_NAME)
    .ignore();
};

const down = (): Promise<void> => {
  return Promise.resolve();
};

export { down, up };
