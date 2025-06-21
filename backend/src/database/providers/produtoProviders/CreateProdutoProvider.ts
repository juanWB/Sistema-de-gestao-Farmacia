import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const CreateProdutoProvider = async(produto: Omit<IProduto, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.produto).insert(produto).returning('id');
        
        logger.info(`Produto criado com ID: ${typeof result === "object" ? result.id : result}`);
        
        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        logger.warn(`CreateProdutoProvider retornou valor inválido: ${result}`);
        return new Error("Error ao criar novo produto");
    }catch(err){
        logger.error(`Erro em CreateProdutoProvider: ${JSON.stringify(err)}`);
        return new Error("Error ao criar novo produto");
    }
}