import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ISaidaEstoque } from "../../models";


export const getSaidaEstoqueByIdProvider = async(id: number):Promise<ISaidaEstoque | Error> => {
    try{
        const [result] = await Knex(ETableNames.saidaEstoque).where('id', id).select('*');

        if(result){
            logger.info('getSaidaEstoqueByIdProvider executado com sucesso.');
            return result
        }
        
        logger.warn(`getSaidaEstoqueByIdProvider retornou valor inválido: ${result}`);
        return new Error('Saida não encontrada');
    }catch(err){
        logger.error(`Erro em getSaidaEstoqueByIdProvider: ${JSON.stringify(err)}`);
        return new Error('Erro ao buscar Saida');
    }
}