import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const Count = async(filter = ''):Promise<number | Error> => {
  try { 
    const [{ count }] = await Knex(ETableNames.entradaEstoque)
        .where('entrada_data', 'like', `%${filter}%`)
        .count<[{ count: number }]>('* as count');  

    if(Number.isInteger(Number(count))){
      logger.info(`[EntradaEstoque] Count executado com sucesso. Total encontrado: ${count}`);
      return Number(count);
    }

    logger.warn(`[EntradaEstoque] Count retornou valor inválido: ${count}`);
    return new Error("Erro ao consultar a quantidade total de registros");
  } catch (err) {
    logger.error(`[EntradaEstoque] Erro na execução do Count: ${JSON.stringify(err)}`);
    return new Error("Erro ao consultar a quantidade total de registros");
  }
};
