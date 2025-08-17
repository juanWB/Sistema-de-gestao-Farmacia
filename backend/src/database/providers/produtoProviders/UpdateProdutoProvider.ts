import dayjs from "dayjs";
import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const updateProdutoProvider = async(id: number, produto: Omit<IProduto, 'id'>):Promise<IProduto | Error> => {
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

        console.log(produto.validade + " provider");

        const validadeFormatada = produto.validade
        ? dayjs(produto.validade).format("YYYY-MM-DD")
        : null;

        console.log(validadeFormatada + " provider");

        const [result] = await Knex(ETableNames.produto)
        .where('id', id)
        .update({'nome': produto.nome,
            'preco': produto.preco,
            'quantidade': produto.quantidade,
            'validade': validadeFormatada})
            .returning<IProduto[]>('*');

        if(result){
            logger.info(`Produto com id ${id} atualizada com sucesso`);
            return result;
        }

       logger.warn(`UpdateProdutoProvider falhou em atualizar produto com id ${id}`);
       return new Error("Error ao atualizar Produto")
    }catch(err){
       logger.error(`UpdateProdutoProvider falhou em atualizar produto: ${JSON.stringify(err)}`);
       return new Error("Error ao atualizar Produto")
    }
}