// ts by Woody

import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  const hasTable = await knex.schema.hasTable("photos");
  if (!hasTable) {
    return knex.schema.createTable("photos", (table) => {
      table.increments();
      table.timestamps(false, true);
      table.string("image").notNullable();
      table.string("title").notNullable();
      table.string("description");
      table.string("location");
      table.string("district").notNullable();
      table.string("environment").notNullable();
      table.string("status").notNullable;
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("users.id");
      table.float("latitude").notNullable();
      table.float("longitude").notNullable();
    });
  } else {
    return Promise.resolve();
  }
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("photos");
}
