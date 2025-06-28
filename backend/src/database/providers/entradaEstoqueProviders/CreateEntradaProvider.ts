import { logger } from "../../../shared/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEntradaEstoque } from "../../models";


export const CreateEntradaProvider = async(entrada: Omit<IEntradaEstoque, 'id'>):Promise<number | Error> => {
    try{
        const [{count: countProdutoRaw}] = await Knex(ETableNames.produto)
            .where('id', entrada.produto_id)
            .count<[{count: number}]>('* as count');

        const countProduto = countProdutoRaw;
        
        if(countProduto === 0) return new Error('Produto não encontrado');

        const [result] = await Knex(ETableNames.entradaEstoque).insert(entrada).returning('id');
        
        if(typeof result === 'object'){
            logger.info(`EntradaEstoque criada com ID: ${result.id}`);
            return result.id;
        } else if(typeof result === 'number'){
            logger.info(`EntradaEstoque criada com ID: ${result}`);
            return result;
        }


        logger.warn(`CreateEntradaProvider retornou valor inválido: ${result}`);
        return new Error("Error ao criar nova entrada no estoque");
    }catch(err){
        logger.error(`Erro em CreateEntradaProvider: ${JSON.stringify(err)}`);
        return new Error("Error ao criar nova entrada no estoque");
    }
}