import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const GetFuncionarioByIdProvider = async(id: number):Promise<IFuncionario | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario).where('id', id).select('*');

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