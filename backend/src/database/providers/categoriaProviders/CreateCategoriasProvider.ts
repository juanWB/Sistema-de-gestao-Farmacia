import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICategoria } from "../../models";

export const CreateCategoriaProvider = async (categoria: Omit<ICategoria, "id">): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.categoria)
      .insert(categoria)
      .returning("id");

    logger.info(
      `Categoria criada com ID: ${
        typeof result === "object" ? result.id : result
      }`
    );

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    logger.warn(`CreateCategoriaProvider retornou valor inválido: ${result}`);
    return new Error("Error ao criar nova categoria");
  } catch (err) {
    logger.error(`Erro em CreateCategoriaProvider: ${JSON.stringify(err)}`);
    return new Error("Error ao criar nova categoria");
  }
};
