import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICategoria, IProduto } from "../../models";

export const GetCategoriaProvider = async (filter: string): Promise<ICategoria[] | Error> => {
  try {
    const result = await Knex(ETableNames.categoria)
      .select("*")
      .modify((query) => {
        if(filter?.trim()){
          query.where("nome", "like", `%${filter}%`)
        }
      })

    logger.info(`GetCategoriaProvider executado com sucesso.`);
    return result;
  } catch (err) {
    logger.error(`GetCategoriaProvider falhou ao buscar categorias: ${JSON.stringify(err)}`);
    return new Error("Error ao buscar categorias");
  }
};
