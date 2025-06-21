import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEntradaEstoque } from "../../models";


export const CreateEntradaProvider = async(entrada: Omit<IEntradaEstoque, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.entradaEstoque).insert(entrada).returning('id');
        
        logger.info(`EntradaEstoque criada com ID: ${typeof result === "object" ? result.id : result}`);

        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }


        logger.warn(`CreateEntradaProvider retornou valor inválido: ${result}`);
        return new Error("Error ao criar nova entrada no estoque");
    }catch(err){
        logger.error(`Erro em CreateEntradaProvider: ${JSON.stringify(err)}`);
        return new Error("Error ao criar nova entrada no estoque");
    }
}