import knex from 'knex'
import { table } from 'console'

export async function up(knex: knex){
    return knex.schema.createTable("usuarios", table => {
        table.increments("id").primary()
        table.string("nome").notNullable()
        table.string("email").notNullable()
        table.string("senha").notNullable()
        table.boolean("administrador").defaultTo(false)
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('usuarios')
}