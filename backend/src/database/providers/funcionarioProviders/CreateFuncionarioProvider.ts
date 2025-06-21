import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const CreateFuncionarioProvider = async(funcionario: Omit<IFuncionario, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario).insert(funcionario).returning('id');
        
        logger.info(`Funcionario criado com ID: ${typeof result === "object" ? result.id : result}`);

        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        logger.warn(`CreateFuncionarioProvider retornou valor inválido: ${result}`);
        return new Error("Error ao criar novo funcionario");
    }catch(err){
        logger.error(`Erro em CreateFuncionarioProvider: ${JSON.stringify(err)}`);
        return new Error("Error ao criar novo funcionario");
    }
}