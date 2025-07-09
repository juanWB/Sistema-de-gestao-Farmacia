import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ISaidaEstoque } from "../../models";


export const createSaidaProvider = async(saida: Omit<ISaidaEstoque, 'id'>):Promise<number | Error> => {
    try{
        const [{count: countProdutoRaw}] = await Knex(ETableNames.produto)
            .where('id', saida.produto_id)
            .count<[{count: number}]>('* as count');

        const countProduto = countProdutoRaw;
        
        if(countProduto === 0) return new Error('Produto não encontrado');

        const [result] = await Knex(ETableNames.saidaEstoque).insert(saida).returning('id');
        
        if(typeof result === 'object'){
            logger.info(`EntradaEstoque criada com ID: ${result.id}`);
            return result.id;
        } else if(typeof result === 'number'){
            logger.info(`EntradaEstoque criada com ID: ${result}`);
            return result;
        }

        return new Error("Error ao criar nova saida do estoque");
    }catch(err){
        console.log(err);
        return new Error("Error ao criar nova saida do estoque");
    }
}