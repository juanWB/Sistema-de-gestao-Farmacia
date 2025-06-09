import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.produto, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).index().notNullable();
      table.decimal("preco", 10, 2).index().notNullable().checkPositive('preco_positivo_check');
      table.date("validade").index().notNullable();
      table.integer("quantidade").index().notNullable().checkPositive('quantidade_positiva_check');
      table.bigInteger("categoria_id").unsigned().references('id').inTable(ETableNames.categoria).onDelete('RESTRICT');
      table.bigInteger("fornecedor_id").unsigned().references('id').inTable(ETableNames.fornecedor).onDelete('RESTRICT');


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
