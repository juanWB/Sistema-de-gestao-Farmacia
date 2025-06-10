import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.saidaEstoque, (table) => {
      table.bigIncrements("id").primary().index();
      table.bigInteger("produto_id").unsigned().references('id').inTable(ETableNames.produto).onDelete('RESTRICT')
      table.integer("quantidade").notNullable()
      table.timestamps(true);

      table.comment(
        "Tabela para armazenar os dados de saida no estoque da farmácia."
      );
    })
    .then(() => {
      console.log("#Tabela saida_estoque criada");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.saidaEstoque).then(() => {
    console.log('#Drop Table saida_estoque executado.')
  });
}
