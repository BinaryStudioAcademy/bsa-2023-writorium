import { type Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return await knex.raw(
    'CREATE UNIQUE INDEX IF NOT EXISTS users_lowercase_email ON users (lower(email)); alter table users drop constraint users_email_unique;',
  );
}

async function down(knex: Knex): Promise<void> {
  return await knex.raw(
    'DROP index IF EXISTS users_lowercase_email; ALTER TABLE users ADD CONSTRAINT user_email_unique UNIQUE (email);',
  );
}

export { down, up };
