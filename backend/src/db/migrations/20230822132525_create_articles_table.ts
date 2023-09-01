import { type Knex } from 'knex';

const TableName = {
  USERS: 'users',
  ARTICLES: 'articles',
} as const;

const ColumnName = {
  ID: 'id',
  TITLE: 'title',
  TEXT: 'text',
  USER_ID: 'user_id',
  PROMPT_ID: 'prompt_id',
  GENRE_ID: 'genre_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  PUBLISHED_AT: 'published_at',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.ARTICLES, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.TITLE).notNullable();
    table.text(ColumnName.TEXT).notNullable();
    table
      .integer(ColumnName.USER_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table.integer(ColumnName.PROMPT_ID).unsigned().nullable();
    table.integer(ColumnName.GENRE_ID).unsigned();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.dateTime(ColumnName.PUBLISHED_AT).nullable();
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(TableName.ARTICLES);
};

export { down, up };
