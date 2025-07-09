import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ISaidaEstoque } from "../../models";

export const getSaidaProvider = async (
  page: number,
  limit: number,
  filter: string,
  produto_id: number
): Promise<ISaidaEstoque[] | Error> => {
  try {
    const result = await Knex(ETableNames.saidaEstoque)
      .select("*")
      .modify((query) => {
        if (filter) {
          query.where("saida_data", "like", `%${filter}%`);
        }

        if (produto_id && produto_id > 0) {
          query.andWhere("produto_id", produto_id);
        }
      })
      .offset((page - 1) * limit)
      .limit(limit);

    logger.info(`GetSaidaProvider executado com sucesso.`);
    return result;
  } catch (err) {
    logger.error(
      `GetSaidaProvider falhou ao buscar vategorias: ${JSON.stringify(err)}`
    );
    return new Error("Error ao buscar entradas no estoque");
  }
};
