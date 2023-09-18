import { type Knex } from 'knex';

const TableName = {
  USERS: 'users',
  ARTICLES: 'articles',
  FAVOURED_USER_ARTICLES: 'favoured_user_articles',
} as const;

const ColumnName = {
  USER_ID: 'user_id',
  ARTICLE_ID: 'article_id',
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.FAVOURED_USER_ARTICLES, (table) => {
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
    table.primary([ColumnName.USER_ID, ColumnName.ARTICLE_ID]);
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(TableName.FAVOURED_USER_ARTICLES);
};

export { down, up };
