import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const DeleteFuncionarioProvider = async(id: number):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.funcionario).where('id', id).del()

        if(result > 0){
            logger.info(`Funcionario deletado com id ${id} sucesso`);
            return;
        }

        logger.warn(`DeleteFuncionarioProvider falhou ao tentar deletar categoria com id ${id}`);
        return new Error("Error ao tentar deletar funcionario")
    }catch(err){
        logger.error(`DeleteFuncionarioProvider falhou ao tentar deletar categoria: ${JSON.stringify(err)}`);
        return new Error("Error ao tentar deletar funcionario")
    }
}