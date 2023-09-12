import { type Knex } from 'knex';

const TABLE_NAME = 'articles';

const COLUMN_NAME = 'read_time';

const up = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.integer(COLUMN_NAME).unsigned().nullable();
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
};

export { down, up };
