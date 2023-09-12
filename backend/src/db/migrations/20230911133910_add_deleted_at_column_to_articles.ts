import { type Knex } from 'knex';

const TableName = 'articles';

const ColumnName = {
  DELETED_AT: 'deleted_at',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TableName, (table) => {
    table.dateTime(ColumnName.DELETED_AT).nullable();
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TableName, (table) => {
    table.dropColumn(ColumnName.DELETED_AT);
  });
};

export { down, up };
