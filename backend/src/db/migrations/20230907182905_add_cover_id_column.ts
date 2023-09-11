import { type Knex } from 'knex';

const TableName = {
  ARTICLES: 'articles',
  FILES: 'files',
} as const;

const ColumnName = {
  ID: 'id',
  COVER_ID: 'cover_id',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TableName.ARTICLES, (table) => {
    table
      .integer(ColumnName.COVER_ID)
      .unsigned()
      .nullable()
      .references(ColumnName.ID)
      .inTable(TableName.FILES);
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TableName.ARTICLES, (table) => {
    table.dropForeign(ColumnName.COVER_ID);
    table.dropColumn(ColumnName.COVER_ID);
  });
};

export { down, up };
