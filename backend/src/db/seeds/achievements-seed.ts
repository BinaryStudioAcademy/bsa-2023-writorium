import { type Knex } from 'knex';

import { DatabaseTableName } from '~/libs/packages/database/libs/enums/enums.js';

import { achievements } from '../seed-data/achievements.js';

const seed = async (knex: Knex): Promise<void> => {
  await knex(DatabaseTableName.ACHIEVEMENTS).del();
  await knex(DatabaseTableName.ACHIEVEMENTS).insert(achievements);
};

export { seed };
