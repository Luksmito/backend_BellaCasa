import knex from "knex"


export async function up(knex: knex){
    return knex.schema.createTable('produtos', table => {
        table.increments('id').primary()
        table.string("nome").notNullable()
        table.string("preco").notNullable()
        table.string("descricao").notNullable()
        table.string("imagem").notNullable()
    })
}

export async function down(knex: knex){
    return knex.schema.dropTable("produtos")
}