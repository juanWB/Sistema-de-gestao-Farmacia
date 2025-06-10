import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFornecedor } from "../../models";


export const GetFornecedorProvider = async():Promise<IFornecedor[] | Error> => {
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