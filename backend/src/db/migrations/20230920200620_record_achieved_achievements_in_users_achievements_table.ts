import { type Knex } from 'knex';

const TableName = {
  USERS_ACHIEVEMENTS: 'users_achievements',
  ACHIEVEMENTS: 'achievements',
  USERS: 'users',
  ARTICLES: 'articles',
  COMMENTS: 'comments',
} as const;

const up = (knex: Knex): Promise<void> => {
  return knex.raw(`
    WITH UsersCounts AS (
      SELECT t.user_id, t.reference_table, COUNT(*)
      FROM (
        SELECT c.user_id, c.id, a.reference_table
        FROM ${TableName.COMMENTS} c
        JOIN ${TableName.ACHIEVEMENTS} a ON a.reference_table = '${TableName.COMMENTS}'
        GROUP BY c.user_id, c.id, a.reference_table
        UNION ALL
        SELECT ar.user_id, ar.id, a.reference_table
        FROM ${TableName.ARTICLES} ar
        JOIN ${TableName.ACHIEVEMENTS} a ON a.reference_table = '${TableName.ARTICLES}'
        GROUP BY ar.user_id, ar.id, a.reference_table
      ) t
      GROUP BY t.user_id, t.reference_table
    )
    INSERT INTO ${TableName.USERS_ACHIEVEMENTS} (user_id, achievement_id)
    SELECT uc.user_id, a.id AS achievement_id
    FROM UsersCounts uc, ${TableName.ACHIEVEMENTS} a
    WHERE uc.reference_table = a.reference_table AND uc.count >= a.breakpoint;
  `);
};

const down = (knex: Knex): Promise<void> => {
  return knex(TableName.USERS_ACHIEVEMENTS).del();
};

export { down, up };
