import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICategoria } from "../../models";

export const UpdateCategoriaProvider = async ( id: number,categoria: Omit<ICategoria, "id">): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.categoria)
      .where("id", id)
      .update({ nome: categoria.nome });

    if (result > 0){
        logger.info(`Categoria com id ${id} atualizada com sucesso`);
        return;
    }

    logger.warn(`UpdateCategoriaProvider falhou em atualizar categoria com id ${id}`);
    return new Error("Error ao atualizar categoria");
  } catch (err) {
    logger.error(`UpdateCategoriaProvider falhou em atualizar categoria: ${JSON.stringify(err)}`);
    return new Error("Error ao atualizar categoria");
  }
};
