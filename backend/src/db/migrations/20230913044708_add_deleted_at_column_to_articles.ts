import { type Knex } from 'knex';

const TABLE_NAME = 'articles';

const COLUMN_NAME = {
  DELETED_AT: 'deleted_at',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dateTime(COLUMN_NAME.DELETED_AT).nullable();
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME.DELETED_AT);
  });
};

export { down, up };
