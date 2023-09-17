import { type Knex } from 'knex';

const TABLE_NAME = 'genres';

const GENRE_KEY_COLUMN_NAME = 'key';

const UNKNOWN_GENRE = { key: 'unknown', name: 'Unknown' } as const;

const up = async (knex: Knex): Promise<void> => {
  return await knex(TABLE_NAME)
    .where(GENRE_KEY_COLUMN_NAME, UNKNOWN_GENRE.key)
    .then(async (rows) => {
      if (!rows.length) {
        await knex(TABLE_NAME).insert(UNKNOWN_GENRE);
      }
    });
};

const down = (knex: Knex): Promise<void> => {
  return knex(TABLE_NAME).where({ key: UNKNOWN_GENRE.key }).del();
};

export { down, up };
