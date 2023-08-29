import { type Knex } from 'knex';

const TABLE_NAME = 'files';

const ColumnName = {
  ID: 'id',
  URL: 'url',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.text(ColumnName.URL).notNullable();
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
