import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteSaidaEstoqueProvider = async(id: number):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.saidaEstoque).where('id', id).del()

        if(result > 0){
            logger.info(`SaidaEstoque deletado com id ${id} sucesso`);
            return;
        }
        logger.warn(`DeleteSaidaEstoqueProvider falhou ao tentar deletar categoria com id ${id}`);
        return new Error("Error ao tentar deletar Saida do Estoque");
    }catch(err){
        logger.error(`DeleteSaidaEstoqueProvider falhou ao tentar deletar categoria: ${JSON.stringify(err)}`);
        return new Error("Error ao tentar deletar Saida do Estoque");
    }
}