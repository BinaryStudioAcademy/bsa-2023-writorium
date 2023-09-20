import { type Knex } from 'knex';

const TableName = {
  USERS_ACHIEVEMENTS: 'users_achievements',
  ACHIEVEMENTS: 'achievements',
  USERS: 'users',
  ARTICLES: 'articles',
  COMMENTS: 'comments',
} as const;

const REFERENCE_TABLES = [TableName.ARTICLES, TableName.COMMENTS];

type User = {
  id: number;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  updatedAt: string;
};

type ACHIEVEMENT = {
  id: number;
  key: string;
  name: string;
  description: string;
  referenceTable: typeof TableName.ARTICLES | typeof TableName.COMMENTS;
  breakpoint: number;
  createdAt: string;
  updatedAt: string;
};

const up = async (knex: Knex): Promise<void> => {
  const users = await knex<User>(TableName.USERS).select('*');
  const achievements = await knex<ACHIEVEMENT>(TableName.ACHIEVEMENTS).select(
    '*',
  );

  for (const user of users) {
    for (const tableName of REFERENCE_TABLES) {
      const { count } = (await knex(tableName)
        .select()
        .count()
        .where('userId', user.id)
        .first()) as { count: string };

      for (const achievement of achievements) {
        if (
          achievement.referenceTable === tableName &&
          achievement.breakpoint <= Number(count)
        ) {
          await knex(TableName.USERS_ACHIEVEMENTS).insert({
            userId: user.id,
            achievementId: achievement.id,
          });
        }
      }
    }
  }
};

const down = (knex: Knex): Promise<void> => {
  return knex(TableName.USERS_ACHIEVEMENTS).del();
};

export { down, up };
