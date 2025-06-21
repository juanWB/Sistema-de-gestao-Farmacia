import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFornecedor } from "../../models";


export const CreateFornecedorProvider = async(fornecedor: Omit<IFornecedor, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.fornecedor).insert(fornecedor).returning('id');
        
        logger.info(`Fornecedor criado com ID: ${typeof result === "object" ? result.id : result}`);
        
        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        logger.warn(`CreateFornecedorProvider retornou valor inválido: ${result}`);
        return new Error("Error ao criar novo fornecedor ");
    }catch(err){
        logger.error(`Erro em CreateFornecedorProvider: ${JSON.stringify(err)}`);
        return new Error("Error ao criar novo fornecedor ");
    }
}