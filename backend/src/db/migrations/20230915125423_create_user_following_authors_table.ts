import { type Knex } from 'knex';

const TableName = {
  USERS: 'users',
  USER_FOLLOWING_AUTHORS: 'user_following_authors',
} as const;

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  AUTHOR_ID: 'author_id',
  GENRE_ID: 'genre_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.USER_FOLLOWING_AUTHORS, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table
      .integer(ColumnName.AUTHOR_ID)
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
    table.unique([ColumnName.USER_ID, ColumnName.AUTHOR_ID]);
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(TableName.USER_FOLLOWING_AUTHORS);
};

export { down, up };
