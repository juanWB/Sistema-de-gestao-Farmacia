import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEntradaEstoque } from "../../models";


export const updateEntradaEstoqueProvider = async(id: number, entradaEstoque: Omit<IEntradaEstoque, 'id'>) => {
    try{
        const [result] = await Knex(ETableNames.entradaEstoque)
        .where('id',id)
        .update({'produto_id': entradaEstoque.produto_id,
                    'quantidade': entradaEstoque.quantidade,
                    'entrada_data': entradaEstoque.entrada_data,
        })
        .returning('*');

        if(result){
            logger.info(`EntradaEstoque com id ${id} atualizada com sucesso`);
            return result;
        }
    
        logger.warn(`updateEntradaEstoqueProvider falhou em atualizar Entrada com id ${id}`);
        return new Error("Error ao atualizar entradaEstoque")
    }catch(err){
        logger.error(`updateEntradaEstoqueProvider falhou em atualizar Entrada: ${JSON.stringify(err)}`);
        return new Error("Error ao atualizar entradaEstoque")
    }
}