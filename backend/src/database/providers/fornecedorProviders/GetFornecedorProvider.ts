import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const GetFornecedorProvider = async()=> {
    try{
        const [result] = await Knex(ETableNames.fornecedor).select('*')

        if(result.length > 0){
            return result
        }
    
        throw new Error("Error ao buscar fornecedor")
    }catch(err){
        console.log(err);
        throw new Error("Error ao buscar fornecedor")
    }
}