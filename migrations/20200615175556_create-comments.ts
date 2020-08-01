// ts by Woody

import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  const hasTable = await knex.schema.hasTable("comments");
  if (!hasTable) {
    return knex.schema.createTable("comments", (table) => {
      table.increments();
      table.timestamps(false, true);
      table.string("content").notNullable(); // varchar(256)
      table.integer("photo_id").unsigned();
      table.foreign("photo_id").references("photos.id");
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("users.id");
    });
  } else {
    return Promise.resolve();
  }
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("comments");
}
