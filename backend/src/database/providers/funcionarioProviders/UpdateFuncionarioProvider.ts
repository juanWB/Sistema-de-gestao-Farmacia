import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const updateFuncionarioProvider = async(id: number, funcionario: Omit<IFuncionario, 'id'>):Promise< IFuncionario | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario)
        .where('id',id)
        .update({'nome': funcionario.nome,
            'email': funcionario.email,})
            .returning<IFuncionario[]>('*');

        if(result){
            logger.info(`Funcionario com id ${id} atualizada com sucesso`);
            return result;
        }
        
        logger.warn(`updateFuncionarioProvider falhou em atualizar funcionario com id ${id}`);
        return new Error("Error ao atualizar funcionario")
    }catch(err){
        logger.error(`updateFuncionarioProvider falhou em atualizar funcionario: ${JSON.stringify(err)}`);
        return new Error("Error ao atualizar funcionario")
    }
}