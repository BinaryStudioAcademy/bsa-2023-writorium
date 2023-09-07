import { type Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  await knex.raw(
    'CREATE UNIQUE INDEX IF NOT EXISTS users_lowercase_email ON users (lower(email));',
  );
  await knex.raw('alter table users drop constraint users_email_unique;');
}

async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP index IF EXISTS users_lowercase_email;');
  await knex.raw(
    'ALTER TABLE users ADD CONSTRAINT user_email_unique UNIQUE (email);',
  );
}

export { down, up };
