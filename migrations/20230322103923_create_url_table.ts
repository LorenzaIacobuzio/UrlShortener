import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('urls', function (table) {
        table.string("url", 255).notNullable().unique()
        table.string("urlIndex", 255).notNullable().unique()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("urls")
}
