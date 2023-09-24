import { type Knex } from 'knex';

const TableName = { USER_DETAILS: 'user_details', USERS: 'users' };

const ColumnName = {
  ID: 'id',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  USER_ID: 'user_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const CASCADE_RELATION_RULE = 'CASCADE';

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.USER_DETAILS, (table) => {
    table.increments(ColumnName.ID).primary();
    table.text(ColumnName.FIRST_NAME).notNullable();
    table.text(ColumnName.LAST_NAME).notNullable();
    table
      .integer(ColumnName.USER_ID)
      .notNullable()
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onDelete(CASCADE_RELATION_RULE)
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
  return knex.schema.dropTableIfExists(TableName.USER_DETAILS);
};

export { down, up };
