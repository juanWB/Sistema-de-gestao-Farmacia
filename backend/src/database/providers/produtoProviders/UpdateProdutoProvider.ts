import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const UpdateProdutoProvider = async(id: number, produto: Omit<IProduto, 'id'>):Promise<IProduto | Error> => {
    try{
        const [result] = await Knex(ETableNames.produto)
        .where('id',id)
        .update({'nome': produto.nome,
            'preco': produto.preco,
            'quantidade': produto.quantidade,
            'validade': produto.validade})
            .returning<IProduto[]>('*');

        if(result){
            return result
        }
    
       return new Error("Error ao atualizar Produto")
    }catch(err){
        console.log(err);
       return new Error("Error ao atualizar Produto")
    }
}