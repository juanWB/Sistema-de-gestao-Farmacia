import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.produto, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).index().notNullable();
      table.decimal("preco", 10, 2).notNullable()
      table.date("validade").notNullable();
      table.integer("quantidade").notNullable()
      table.bigInteger("categoria_id").unsigned().references('id').inTable(ETableNames.categoria).onDelete('CASCADE');
      table.bigInteger("fornecedor_id").unsigned().references('id').inTable(ETableNames.fornecedor).onDelete('CASCADE');

      
      table.comment(
        "Tabela para armazenar os dados de produtos da farmácia."
      );
    })
    .then(() => {
      console.log("#Tabela produto criada");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.produto).then(() => {
    console.log('#Drop Table produto executado.')
  });
}
