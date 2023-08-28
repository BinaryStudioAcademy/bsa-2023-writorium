import { type Knex } from 'knex';

import { GENRES } from './libs/constants/genres.js';

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
    table.string('Name').notNullable().unique();
    table.string('Key').notNullable().unique();
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
