import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";


export const GetProdutoProvider = async():Promise<IProduto[] | Error> => {
    try{
        const result = await Knex(ETableNames.produto).select('*')

        if(result.length > 0){
            return result
        }
    
        throw new Error("Error ao buscar produtos")
    }catch(err){
        console.log(err);
        throw new Error("Error ao buscar produtos")
    }
}