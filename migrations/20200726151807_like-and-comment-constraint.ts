import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.alterTable("likes", (table) => {
    table.unique(["user_id", "photo_id"]);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.alterTable("likes", (table) => {
    table.dropUnique(["user_id", "photo_id"]);
  });
}
