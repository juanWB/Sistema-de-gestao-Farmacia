import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const GetProdutoByIdProvider = async(id: number):Promise<IProduto | Error> => {
    try{
        const [result] = await Knex(ETableNames.produto).where('id', id).select('*');

        if(result){
            return result
        }
        
        throw new Error('Produto não encontrado');
    }catch(err){
        console.log(err);
        throw new Error('Erro ao buscar produto');
    }
}