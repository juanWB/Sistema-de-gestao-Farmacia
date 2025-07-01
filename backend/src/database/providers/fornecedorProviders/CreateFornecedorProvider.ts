import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFornecedor } from "../../models";


export const createFornecedorProvider = async(fornecedor: Omit<IFornecedor, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.fornecedor).insert(fornecedor).returning('id');
                
        if(typeof result === 'object'){
        logger.info(`Fornecedor criado com ID: ${result.id}`);            
            return result.id;
        } else if(typeof result === 'number'){
        logger.info(`Fornecedor criado com ID: ${result}`);
            return result;
        }

        logger.warn(`CreateFornecedorProvider retornou valor inválido: ${result}`);
        return new Error("Error ao criar novo fornecedor ");
    }catch(err){
        logger.error(`Erro em CreateFornecedorProvider: ${JSON.stringify(err)}`);
        return new Error("Error ao criar novo fornecedor ");
    }
}