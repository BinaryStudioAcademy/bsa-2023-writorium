import { type Knex } from 'knex';

const TableName = {
  PROMPTS: 'prompts',
  GENRES: 'genres',
} as const;

const ColumnName = {
  ID: 'id',
  CHARACTER: 'character',
  SETTING: 'setting',
  SITUATION: 'situation',
  PROP: 'prop',
  TYPE: 'type',
  GENRE_ID: 'genre_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const PromptType = {
  DAILY: 'daily',
  MANUAL: 'manual',
} as const;

const CASCADE_RELATION_RULE = 'CASCADE';

const up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable(TableName.PROMPTS, (table) => {
    table.increments(ColumnName.ID).primary();
    table.text(ColumnName.CHARACTER).nullable();
    table.text(ColumnName.SETTING).nullable();
    table.text(ColumnName.SITUATION).nullable();
    table.text(ColumnName.PROP).nullable();
    table
      .enum(ColumnName.TYPE, [PromptType.DAILY, PromptType.MANUAL])
      .notNullable();
    table
      .integer(ColumnName.GENRE_ID)
      .unsigned()
      .nullable()
      .references(ColumnName.ID)
      .inTable(TableName.GENRES)
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
  return knex.schema.dropTableIfExists(TableName.PROMPTS);
};

export { down, up };
