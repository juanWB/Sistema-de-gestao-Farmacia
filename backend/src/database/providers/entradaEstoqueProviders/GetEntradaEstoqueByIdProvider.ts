import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEntradaEstoque } from "../../models";


export const getEntradaEstoqueByIdProvider = async(id: number):Promise<IEntradaEstoque | Error> => {
    try{
        const [result] = await Knex(ETableNames.fornecedor).where('id', id).select('*');

        if(result){
            logger.info('getEntradaEstoqueByIdProvider executado com sucesso.');
            return result
        }
        
        logger.warn(`getEntradaEstoqueByIdProvider retornou valor inválido: ${result}`);
        return new Error('fornecedor não encontrado');
    }catch(err){
        logger.error(`Erro em getEntradaEstoqueByIdProvider: ${JSON.stringify(err)}`);
        return new Error('Erro ao buscar fornecedor');
    }
}