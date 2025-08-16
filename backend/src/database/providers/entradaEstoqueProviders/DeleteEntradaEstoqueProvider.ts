import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteEntradaEstoqueProvider = async(id: number):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.fornecedor).where('id', id).del()

        if(result > 0){
            logger.info(`EntradaEstoque deletado com id ${id} sucesso`);
            return;
        }
        logger.warn(`DeleteEntradaEstoqueProvider falhou ao tentar deletar categoria com id ${id}`);
        return new Error("Error ao tentar deletar fornecedor")
    }catch(err){
        logger.error(`DeleteEntradaEstoqueProvider falhou ao tentar deletar categoria: ${JSON.stringify(err)}`);
        return new Error("Error ao tentar deletar fornecedor")
    }
}