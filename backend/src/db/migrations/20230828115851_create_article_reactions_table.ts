import { type Knex } from 'knex';

const TableName = {
  ARTICLE_REACTIONS: 'article_reactions',
  ARTICLES: 'articles',
  USERS: 'users',
};

const ColumnName = {
  ID: 'id',
  ARTICLE_ID: 'article_id',
  USER_ID: 'user_id',
  IS_LIKE: 'is_like',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const CASCADE_RELATION_RULE = 'CASCADE';

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.ARTICLE_REACTIONS, (table) => {
    table.increments(ColumnName.ID).primary();
    table.boolean(ColumnName.IS_LIKE).notNullable().defaultTo(true);
    table
      .integer(ColumnName.USER_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onDelete(CASCADE_RELATION_RULE);
    table
      .integer(ColumnName.ARTICLE_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.ARTICLES)
      .onDelete(CASCADE_RELATION_RULE);
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
  return knex.schema.dropTableIfExists(TableName.ARTICLE_REACTIONS);
};

export { down, up };
