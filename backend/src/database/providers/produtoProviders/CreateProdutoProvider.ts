import dayjs from "dayjs";
import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const createProdutoProvider = async(produto: Omit<IProduto, 'id'>):Promise<number | Error> => {
    try{
        const [{ count: countCategoriaRaw }] = await Knex(ETableNames.categoria)
            .where('id', produto.categoria_id)
            .count<[{ count: number}]>('* as count');
        const countCategoria =  countCategoriaRaw;
            
        const [{ count: countFornecedorRaw }] = await Knex(ETableNames.fornecedor)
            .where('id', produto.fornecedor_id)
            .count<[{ count: number}]>('* as count');
        const countFornecedor =  countFornecedorRaw;

        
        if(countCategoria === 0)return new Error('Categoria não encontrada.');
        
        if(countFornecedor === 0)return new Error('Fornecedor não encontrada.');

         const validadeFormatada = produto.validade
                ? dayjs(produto.validade).format("YYYY-MM-DD")
                : null;
        
                console.log(validadeFormatada + " create provider");

        produto = {...produto, validade: validadeFormatada!};
        const [result] = await Knex(ETableNames.produto).insert(produto).returning('id');
        
        if(typeof result === 'object'){
            logger.info(`Produto criado com ID: ${result.id}`);
            return result.id;
        } else if(typeof result === 'number'){
            logger.info(`Produto criado com ID: ${result}`);
            return result;
        }

        logger.warn(`CreateProdutoProvider retornou valor inválido: ${result}`);
        return new Error("Error ao criar novo produto");
    }catch(err){
        logger.error(`Erro em CreateProdutoProvider: ${JSON.stringify(err)}`);
        return new Error("Error ao criar novo produto");
    }
}