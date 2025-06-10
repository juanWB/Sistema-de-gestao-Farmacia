import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const UpdateProdutoProvider = async(produto: IProduto):Promise<IProduto | Error> => {
    try{
        const [result] = await Knex(ETableNames.produto)
        .where('id',produto.id)
        .update({'nome': produto.nome,
            'preco': produto.preco,
            'quantidade': produto.quantidade,
            'validade': produto.validade})
            .returning<IProduto[]>('*');

        if(result){
            return result
        }
    
        throw new Error("Error ao atualizar Produto")
    }catch(err){
        console.log(err);
        throw new Error("Error ao atualizar Produto")
    }
}