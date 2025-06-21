import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEntradaEstoque } from "../../models";

export const GetEntradaProvider = async (page: number, limit: number, filter: string, id = 0): Promise<IEntradaEstoque[] | Error> => {
  try {
    const result = await Knex(ETableNames.entradaEstoque)
      .select("*")
      .where("id", id)
      .orWhere("entrada_data", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.entradaEstoque)
        .select("*")
        .where("id", id).first;

      if (resultById) return [...result, resultById];
    }

    logger.info(`GetEntradaProvider executado com sucesso.`);
    return result;
  } catch (err) {
    logger.error(`GetEntradaProvider falhou ao buscar vategorias: ${JSON.stringify(err)}`);
    return new Error("Error ao buscar entradas no estoque");
  }
};
