import { type Knex } from 'knex';

const GENRES = [
  { name: 'Science Fiction', key: 'sci_fi' },
  { name: 'Mystery', key: 'mystery' },
  { name: 'Fantasy', key: 'fantasy' },
  { name: 'Romance', key: 'romance' },
  { name: 'Thriller', key: 'thriller' },
  { name: 'Historical Fiction', key: 'hist_fiction' },
  { name: 'Horror', key: 'horror' },
  { name: 'Adventure', key: 'adventure' },
  { name: 'Biography', key: 'biography' },
  { name: 'Comedy', key: 'comedy' },
  { name: 'Dystopian', key: 'dystopian' },
  { name: 'Non-fiction', key: 'non_fiction' },
  { name: 'Paranormal', key: 'paranormal' },
  { name: 'Satire', key: 'satire' },
  { name: 'Young Adult', key: 'ya_fiction' },
  { name: 'Crime', key: 'crime' },
  { name: 'Drama', key: 'drama' },
  { name: 'Science', key: 'science' },
  { name: 'Urban Fantasy', key: 'urban_fantasy' },
  { name: 'Memoir', key: 'memoir' },
];

const TABLE_NAME = 'genres';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
  KEY: 'key',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).notNullable().unique();
    table.string(ColumnName.KEY).notNullable().unique();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  return await knex.batchInsert(TABLE_NAME, GENRES);
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};

export { down, up };
