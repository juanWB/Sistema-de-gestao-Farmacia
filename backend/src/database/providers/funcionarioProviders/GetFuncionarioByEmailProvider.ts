import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const getFuncionarioByEmailProvider = async(email: string):Promise<IFuncionario | Error> => {
    try{
        const result = await Knex(ETableNames.funcionario).where('email', email).select('*').first();

        if(result){
            logger.info('GetFuncionarioByIdProvider executado com sucesso.');
            return result
        }
        
        logger.warn(`GetFuncionarioByIdProvider retornou valor inválido: ${result}`);
        return new Error('funcionario não encontrado');
    }catch(err){
        logger.error(`Erro em GetFuncionarioByIdProvider: ${JSON.stringify(err)}`);
        return new Error('Erro ao buscar funcionario');
    }
}