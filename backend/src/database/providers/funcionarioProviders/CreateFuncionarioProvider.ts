import { logger } from "../../../shared/service/logger";
import { passwordCrypto } from "../../../shared/service/PasswordCrypto";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const createFuncionarioProvider = async(funcionario: Omit<IFuncionario, 'id'>):Promise<number | Error> => {
    try{

        const hashedPassword = await passwordCrypto.hashPassword(funcionario.senha);

        const [result] = await Knex(ETableNames.funcionario).insert({...funcionario, senha: hashedPassword}).returning('id');
        
        if(typeof result === 'object'){
            logger.info(`Funcionario criado com ID: ${result.id}`);
            return result.id;
        } else if(typeof result === 'number'){
            logger.info(`Funcionario criado com ID: ${result}`);
            return result;
        }

        logger.warn(`CreateFuncionarioProvider retornou valor inválido: ${result}`);
        return new Error("Error ao criar novo funcionario");
    }catch(err){
        logger.error(`Erro em CreateFuncionarioProvider: ${JSON.stringify(err)}`);
        return new Error("Error ao criar novo funcionario");
    }
}