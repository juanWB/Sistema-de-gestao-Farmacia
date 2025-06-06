import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.funcionario, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).index().notNullable();
      table.string("email", 150).index().notNullable();
      table.string("senha", 150).index().notNullable();

      table.comment(
        "Tabela para armzenar os dados de funcionários da farmácia."
      );
    })
    .then(() => {
      console.log("#Create funcionario criada");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.funcionario).then(() => {
    console.log('#Drop Table funcionario executado.')
  });
}
