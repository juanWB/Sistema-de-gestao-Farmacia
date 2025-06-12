import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.fornecedor, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).index().notNullable();
      table.string("cnpj", 14).index().notNullable().unique();
      table.string("telefone", 15).notNullable().unique();
      table.string("endereco", 150).notNullable();

      table.comment(
        "Tabela para armazenar os dados de fornecedores de produtos da farmácia."
      );
    })
    .then(() => {
      console.log("#Tabela fornecedor criada");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.fornecedor).then(() => {
    console.log('#Drop Table fornecedor executado.')
  });
}
