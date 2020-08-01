// ts by Woody

import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  const hasTable = await knex.schema.hasTable("users");
  if (!hasTable) {
    return knex.schema.createTable("users", (table) => {
      table.increments();
      table.timestamps(false, true);
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.string("username").notNullable();
      table.string("role").notNullable();
      table.string("google_id");
    });
  } else {
    return Promise.resolve();
  }
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("users");
}
