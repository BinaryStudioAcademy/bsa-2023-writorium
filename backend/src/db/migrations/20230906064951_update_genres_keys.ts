import { type Knex } from 'knex';

const GENRES_ORIGINAL = [
  { name: 'Science Fiction', key: 'sci_fi' },
  { name: 'Historical Fiction', key: 'hist_fiction' },
  { name: 'Young Adult', key: 'ya_fiction' },
];

const GENRES_UPDATES = [
  { name: 'Science Fiction', newKey: 'science_fiction' },
  { name: 'Historical Fiction', newKey: 'historical_fiction' },
  { name: 'Young Adult', newKey: 'young_adult' },
];

const TABLE_NAME = 'genres';

const COLUMN_NAME = 'name';

const up = async (knex: Knex): Promise<void> => {
  for (const genre of GENRES_UPDATES) {
    await knex(TABLE_NAME)
      .where(COLUMN_NAME, genre.name)
      .update({ key: genre.newKey });
  }
};

const down = async (knex: Knex): Promise<void> => {
  for (const genre of GENRES_ORIGINAL) {
    await knex(TABLE_NAME)
      .where(COLUMN_NAME, genre.name)
      .update({ key: genre.key });
  }
};

export { down, up };
