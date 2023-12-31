import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
  ID: 'id',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  USER_ID: 'user_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.text(ColumnName.FIRST_NAME).notNullable();
    table.text(ColumnName.LAST_NAME).notNullable();
    table
      .integer(ColumnName.USER_ID)
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
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
  return knex.schema.dropTableIfExists(TABLE_NAME);
};

export { down, up };
