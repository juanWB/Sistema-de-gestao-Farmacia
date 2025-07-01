import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteProdutoProvider = async(id: number):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.produto).where('id', id).del()

        if(result > 0){
            logger.info(`Produto deletado com id ${id} sucesso`);
            return;
        }

        logger.warn(`DeleteProdutoProvider falhou ao tentar deletar categoria com id ${id}`);
        return new Error("Error ao tentar deletar .produto")
    }catch(err){
        logger.error(`DeleteProdutoProvider falhou ao tentar deletar categoria: ${JSON.stringify(err)}`);
        return new Error("Error ao tentar deletar .produto")
    }
}