import { logger } from "../../../shared/service/logger";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const getProdutoByIdProvider = async(id: number):Promise<IProduto | Error> => {
    try{
        const [result] = await Knex(ETableNames.produto).where('id', id).select('*');

        if(result){
            logger.info('GetProdutoByIdProvider executado com sucesso.');
            return result;
        }
        
        logger.warn(`GetProdutoByIdProvider retornou valor inválido: ${result}`);
        return new Error('Produto não encontrado');
    }catch(err){
        logger.error(`Erro em GetProdutoByIdProvider: ${JSON.stringify(err)}`);
        return new Error('Erro ao buscar produto');
    }
}