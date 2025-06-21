import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const DeleteCategoriaProvider = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.categoria).where("id", id).del();

    if (result > 0) {
      logger.info(`Categoria deletada com id ${id} sucesso`);
      return;
    }

    logger.warn(`DeleteCategoriaProvider falhou ao tentar deletar categoria com id ${id}`);
    return new Error("Error ao deletar categoria");
  } catch (err) {
    logger.error(`DeleteCategoriaProvider falhou ao tentar deletar categoria: ${JSON.stringify(err)}`);
    return new Error("Error ao deletar categoria");
  }
};
