import { type Knex } from 'knex';

import { achievements } from '../seed-data/achievements.js';

const TABLE_NAME = 'achievements';

const seed = async (knex: Knex): Promise<void> => {
  await knex(TABLE_NAME).del();
  await knex(TABLE_NAME).insert(achievements);
};

export { seed };
