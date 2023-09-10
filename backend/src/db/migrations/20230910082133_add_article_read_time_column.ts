import { type Knex } from 'knex';

const TableName = 'articles' as const;

const ColumnName = 'read_time' as const;

const up = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TableName, (table) => {
    table.integer(ColumnName).unsigned().nullable();
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TableName, (table) => {
    table.dropColumn(ColumnName);
  });
};

export { down, up };
