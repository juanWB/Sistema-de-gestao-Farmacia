import { query } from "winston";
import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEntradaEstoque } from "../../models";

export const getEntradaProvider = async (
  page: number,
  limit: number,
  filter: string,
  produto_id: number
): Promise<IEntradaEstoque[] | Error> => {
  try {
    const result = await Knex(ETableNames.entradaEstoque)
      .select("*")
      .modify((query) => {
        if(filter){
           query.where("entrada_data", "like", `%${filter}%`)
        }

        if(produto_id && produto_id > 0){
          query.andWhere('produto_id', produto_id);
        }
      })
      .offset((page - 1) * limit)
      .limit(limit);


    logger.info(`GetEntradaProvider executado com sucesso.`);
    return result;
  } catch (err) {
    logger.error(
      `GetEntradaProvider falhou ao buscar vategorias: ${JSON.stringify(err)}`
    );
    return new Error("Error ao buscar entradas no estoque");
  }
};
