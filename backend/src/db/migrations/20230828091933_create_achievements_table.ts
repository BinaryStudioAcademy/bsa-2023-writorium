import { type Knex } from 'knex';

const TABLE_NAME = 'achievements';

const ColumnName = {
  ID: 'id',
  KEY: 'key',
  NAME: 'name',
  DESCRIPTION: 'description',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.KEY).notNullable();
    table.string(ColumnName.NAME).notNullable();
    table.text(ColumnName.DESCRIPTION).notNullable();
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
