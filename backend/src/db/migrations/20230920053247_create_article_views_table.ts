import { type Knex } from 'knex';

const TableName = {
  USERS: 'users',
  ARTICLES: 'articles',
  ARTICLE_VIEWS: 'article_views',
} as const;

const ColumnName = {
  ARTICLE_ID: 'article_id',
  VIEWED_BY_ID: 'viewed_by_id',
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.ARTICLE_VIEWS, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .integer(ColumnName.ARTICLE_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.ARTICLES);
    table
      .integer(ColumnName.VIEWED_BY_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.unique([ColumnName.ARTICLE_ID, ColumnName.VIEWED_BY_ID]);
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(TableName.ARTICLE_VIEWS);
};

export { down, up };
