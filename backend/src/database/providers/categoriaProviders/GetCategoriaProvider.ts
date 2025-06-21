import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICategoria, IProduto } from "../../models";

export const GetCategoriaProvider = async (page: number, limit: number, filter: string, id = 0): Promise<ICategoria[] | Error> => {
  try {
    const result = await Knex(ETableNames.categoria)
      .select("*")
      .where("id", id)
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.categoria)
        .select("*")
        .where("id", id).first;

      if (resultById) return [...result, resultById];
    }

    logger.info(`GetCategoriaProvider executado com sucesso.`);
    return result;
  } catch (err) {
    logger.error(`GetCategoriaProvider falhou ao buscar vategorias: ${JSON.stringify(err)}`);
    return new Error("Error ao buscar categorias");
  }
};
