import { type Knex } from 'knex';

const TableName = {
  ACHEVEMENTS: 'achievements',
  ARTICLES: 'articles',
  COMMENTS: 'comments',
} as const;

const ColumnName = {
  BREAKPOINT: 'breakpoint',
  REFERENCE_TABLE: 'reference_table',
} as const;

const DataToUpdate = [
  {
    key: 'write_first_article',
    [ColumnName.BREAKPOINT]: 1,
    [ColumnName.REFERENCE_TABLE]: TableName.ARTICLES,
  },
  {
    key: 'write_5_articles',
    [ColumnName.BREAKPOINT]: 5,
    [ColumnName.REFERENCE_TABLE]: TableName.ARTICLES,
  },
  {
    key: 'write_10_articles',
    [ColumnName.BREAKPOINT]: 10,
    [ColumnName.REFERENCE_TABLE]: TableName.ARTICLES,
  },
  {
    key: 'write_15_articles',
    [ColumnName.BREAKPOINT]: 15,
    [ColumnName.REFERENCE_TABLE]: TableName.ARTICLES,
  },
  {
    key: 'write_25_articles',
    [ColumnName.BREAKPOINT]: 25,
    [ColumnName.REFERENCE_TABLE]: TableName.ARTICLES,
  },
  {
    key: 'write_50_articles',
    [ColumnName.BREAKPOINT]: 50,
    [ColumnName.REFERENCE_TABLE]: TableName.ARTICLES,
  },
  {
    key: 'write_first_comment',
    [ColumnName.BREAKPOINT]: 1,
    [ColumnName.REFERENCE_TABLE]: TableName.COMMENTS,
  },
  {
    key: 'write_5_comments',
    [ColumnName.BREAKPOINT]: 5,
    [ColumnName.REFERENCE_TABLE]: TableName.COMMENTS,
  },
  {
    key: 'write_10_comments',
    [ColumnName.BREAKPOINT]: 10,
    [ColumnName.REFERENCE_TABLE]: TableName.COMMENTS,
  },
  {
    key: 'write_15_comments',
    [ColumnName.BREAKPOINT]: 15,
    [ColumnName.REFERENCE_TABLE]: TableName.COMMENTS,
  },
  {
    key: 'write_25_comments',
    [ColumnName.BREAKPOINT]: 25,
    [ColumnName.REFERENCE_TABLE]: TableName.COMMENTS,
  },
  {
    key: 'write_50_comments',
    [ColumnName.BREAKPOINT]: 50,
    [ColumnName.REFERENCE_TABLE]: TableName.COMMENTS,
  },
];

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable(TableName.ACHEVEMENTS, (table) => {
    table.integer(ColumnName.BREAKPOINT).unsigned();
    table.string(ColumnName.REFERENCE_TABLE);
  });

  for (const { key, ...data } of DataToUpdate) {
    await knex(TableName.ACHEVEMENTS).where('key', key).update(data);
  }

  return await knex.schema.alterTable(TableName.ACHEVEMENTS, (table) => {
    table.integer(ColumnName.BREAKPOINT).unsigned().notNullable().alter();
    table.string(ColumnName.REFERENCE_TABLE).notNullable().alter();
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TableName.ACHEVEMENTS, (table) => {
    table.dropColumns(ColumnName.BREAKPOINT, ColumnName.REFERENCE_TABLE);
  });
};

export { down, up };
