import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ISaidaEstoque } from "../../models";


export const updateSaidaEstoqueProvider = async(id: number, saidaEstoque: Omit<ISaidaEstoque, 'id'>) => {
    try{
        const [result] = await Knex(ETableNames.saidaEstoque)
        .where('id',id)
        .update({'produto_id': saidaEstoque.produto_id,
                    'quantidade': saidaEstoque.quantidade,
                    'saida_data': saidaEstoque.saida_data,
        })
        .returning('*');

        if(result){
            logger.info(`SaidaEstoque com id ${id} atualizada com sucesso`);
            return result;
        }
    
        logger.warn(`updateSaidaEstoqueProvider falhou em atualizar Saida com id ${id}`);
        return new Error("Error ao atualizar saidaEstoque")
    }catch(err){
        logger.error(`updateSaidaEstoqueProvider falhou em atualizar Saida: ${JSON.stringify(err)}`);
        return new Error("Error ao atualizar saidaEstoque")
    }
}