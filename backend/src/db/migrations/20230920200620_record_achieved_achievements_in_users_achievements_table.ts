import { type Knex } from 'knex';

const TableName = {
  USERS_ACHIEVEMENTS: 'users_achievements',
  ACHIEVEMENTS: 'achievements',
  ARTICLES: 'articles',
  COMMENTS: 'comments',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.raw(`
    WITH user_counts AS (
      SELECT
        grouped_reference_tables_counts.user_id,
        grouped_reference_tables_counts.reference_table,
        COUNT(*)
      FROM (
        SELECT
          ${TableName.COMMENTS}.user_id,
          ${TableName.COMMENTS}.id,
          ${TableName.ACHIEVEMENTS}.reference_table
        FROM ${TableName.COMMENTS}
        JOIN ${TableName.ACHIEVEMENTS}
        ON ${TableName.ACHIEVEMENTS}.reference_table = '${TableName.COMMENTS}'
        GROUP BY
          ${TableName.COMMENTS}.user_id,
          ${TableName.COMMENTS}.id,
          ${TableName.ACHIEVEMENTS}.reference_table
        UNION ALL
        SELECT
          ${TableName.ARTICLES}.user_id,
          ${TableName.ARTICLES}.id,
          ${TableName.ACHIEVEMENTS}.reference_table
        FROM ${TableName.ARTICLES}
        JOIN ${TableName.ACHIEVEMENTS}
        ON ${TableName.ACHIEVEMENTS}.reference_table = '${TableName.ARTICLES}'
        GROUP BY
          ${TableName.ARTICLES}.user_id,
          ${TableName.ARTICLES}.id,
          ${TableName.ACHIEVEMENTS}.reference_table
      ) grouped_reference_tables_counts
      GROUP BY
        grouped_reference_tables_counts.user_id,
        grouped_reference_tables_counts.reference_table
    )
    INSERT INTO ${TableName.USERS_ACHIEVEMENTS} (user_id, achievement_id)
    SELECT
      user_counts.user_id,
      ${TableName.ACHIEVEMENTS}.id AS achievement_id
    FROM
      user_counts,
      ${TableName.ACHIEVEMENTS}
    WHERE
      user_counts.reference_table = ${TableName.ACHIEVEMENTS}.reference_table
      AND
      user_counts.count >= ${TableName.ACHIEVEMENTS}.breakpoint;
  `);
};

const down = (knex: Knex): Promise<void> => {
  return knex(TableName.USERS_ACHIEVEMENTS).del();
};

export { down, up };
