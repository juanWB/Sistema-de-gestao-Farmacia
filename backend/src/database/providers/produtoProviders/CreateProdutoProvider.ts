import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const CreateProdutoProvider = async(produto: Omit<IProduto, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.produto).insert(produto).returning('id');
        
        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        return new Error("Error ao criar novo produto");
    }catch(err){
        console.log(err);
        return new Error("Error ao criar novo produto");
    }
}