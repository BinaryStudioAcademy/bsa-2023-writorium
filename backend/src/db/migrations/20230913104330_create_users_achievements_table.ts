import { type Knex } from 'knex';

const TableName = {
  USERS_ACHIEVEMENTS: 'users_achievements',
  ACHIEVEMENTS: 'achievements',
  USERS: 'users',
};

const ColumnName = {
  ID: 'id',
  ACHIEVEMENT_ID: 'achievement_id',
  USER_ID: 'user_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const CASCADE_RELATION_RULE = 'CASCADE';

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.USERS_ACHIEVEMENTS, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .integer(ColumnName.USER_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onDelete(CASCADE_RELATION_RULE);
    table
      .integer(ColumnName.ACHIEVEMENT_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.ACHIEVEMENTS)
      .onDelete(CASCADE_RELATION_RULE);
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.unique([ColumnName.ACHIEVEMENT_ID, ColumnName.USER_ID]);
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(TableName.USERS_ACHIEVEMENTS);
};

export { down, up };
