import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICategoria } from "../../models";


export const GetCategoriaProvider = async():Promise<ICategoria[] | Error> => {
    try{
        const result = await Knex(ETableNames.categoria).select('*')

        if(result.length > 0){
            return result
        }
    
        throw new Error("Error ao buscar categoria")
    }catch(err){
        console.log(err);
        throw new Error("Error ao buscar categoria")
    }
}