import { type Knex } from 'knex';

const ACHIEVEMENTS = [
  {
    key: 'write_first_article',
    name: 'Write First Article',
    description: 'Congratulations on writing your first article!',
  },
  {
    key: 'write_5_articles',
    name: 'Write 5 Articles',
    description: 'You have written 5 articles! Keep up the great work!',
  },
  {
    key: 'write_10_articles',
    name: 'Write 10 Articles',
    description: 'You have reached 10 articles! Your dedication is inspiring!',
  },
  {
    key: 'write_15_articles',
    name: 'Write 15 Articles',
    description: '15 articles written! You are a writing machine!',
  },
  {
    key: 'write_25_articles',
    name: 'Write 25 Articles',
    description:
      '25 articles written! Your commitment to writing is impressive!',
  },
  {
    key: 'write_50_articles',
    name: 'Write 50 Articles',
    description:
      'Wow, you have written 50 articles! You are a prolific writer!',
  },
  {
    key: 'write_first_comment',
    name: 'Write First Comment',
    description:
      'You left your first comment! Keep engaging with the community!',
  },
  {
    key: 'write_5_comments',
    name: 'Write 5 Comments',
    description: 'You have written 5 comments! Your insights are valuable!',
  },
  {
    key: 'write_10_comments',
    name: 'Write 10 Comments',
    description:
      'You have left 10 comments! Your contributions are appreciated!',
  },
  {
    key: 'write_15_comments',
    name: 'Write 15 Comments',
    description:
      '15 comments made! You are actively participating in discussions!',
  },
  {
    key: 'write_25_comments',
    name: 'Write 25 Comments',
    description:
      '25 comments written! You are an engaged member of the community!',
  },
  {
    key: 'write_50_comments',
    name: 'Write 50 Comments',
    description: '50 comments made! Your feedback and discussions matter!',
  },
];

const TABLE_NAME = 'achievements';

const ColumnName = {
  ID: 'id',
  KEY: 'key',
  NAME: 'name',
  DESCRIPTION: 'description',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(TABLE_NAME, (table) => {
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

  return await knex.batchInsert(TABLE_NAME, ACHIEVEMENTS);
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};

export { down, up };
