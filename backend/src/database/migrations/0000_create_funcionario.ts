import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.funcionario, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).index().notNullable();
      table.string("email", 150).notNullable().unique();
      table.string("senha", 255).notNullable();
      table.timestamps(true, true);

      table.comment(
        "Tabela para armazenar os dados de funcionários da farmácia."
      );
    })
    .then(() => {
      console.log("#Tabela funcionarios criada");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.funcionario).then(() => {
    console.log('#Drop Table funcionario executado.')
  });
}
