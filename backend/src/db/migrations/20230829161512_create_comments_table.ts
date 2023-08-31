import { type Knex } from 'knex';

const TableName = {
  USERS: 'users',
  ARTICLES: 'articles',
  COMMENTS: 'comments',
} as const;

const ColumnName = {
  ID: 'id',
  TEXT: 'text',
  USER_ID: 'user_id',
  ARTICLE_ID: 'article_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  PUBLISHED_AT: 'published_at',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.COMMENTS, (table) => {
    table.increments(ColumnName.ID).primary();
    table.text(ColumnName.TEXT).notNullable();
    table
      .integer(ColumnName.USER_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table
      .integer(ColumnName.ARTICLE_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.ARTICLES);
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(TableName.COMMENTS);
};

export { down, up };
