import { type Knex } from 'knex';

const TABLE_NAME = 'articles';

const COLUMN_NAME = 'deleted_at';

const up = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dateTime(COLUMN_NAME).nullable();
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
};

export { down, up };
