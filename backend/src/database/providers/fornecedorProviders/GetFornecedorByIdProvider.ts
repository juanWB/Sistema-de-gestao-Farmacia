import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFornecedor } from "../../models";


export const getFornecedorByIdProvider = async(id: number):Promise<IFornecedor | Error> => {
    try{
        const [result] = await Knex(ETableNames.fornecedor).where('id', id).select('*');

        if(result){
            logger.info('getFornecedorByIdProvider executado com sucesso.');
            return result
        }
        
        logger.warn(`getFornecedorByIdProvider retornou valor inválido: ${result}`);
        return new Error('fornecedor não encontrado');
    }catch(err){
        logger.error(`Erro em getFornecedorByIdProvider: ${JSON.stringify(err)}`);
        return new Error('Erro ao buscar fornecedor');
    }
}