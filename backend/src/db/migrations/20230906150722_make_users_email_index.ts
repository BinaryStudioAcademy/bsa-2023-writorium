import { type Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return await knex.raw(
    'CREATE UNIQUE INDEX users_lowercase_email ON users (lower(email));',
  );
}

async function down(knex: Knex): Promise<void> {
  return await knex.raw(
    'DROP index IF EXISTS users_lowercase_email;',
    'DROP index IF EXISTS users_email_unique;',
  );
}

export { down, up };
