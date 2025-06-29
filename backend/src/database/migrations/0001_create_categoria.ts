import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.categoria, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).index().notNullable().unique();
      
      table.comment(
        "Tabela para armazenar os dados de categorias de produtos da farmácia."
      );
    })
    .then(() => {
      console.log("#Tabela categoria criada");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.categoria).then(() => {
    console.log('#Drop Table categoria executado.')
  });
}
