import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICategoria } from "../../models";


export const CreateCategoriaProvider = async(categoria: Omit<ICategoria, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.categoria).insert(categoria).returning('id');
        
        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        throw new Error("Error ao criar nova categoria");
    }catch(err){
        console.log(err);
        throw new Error("Error ao criar nova categoria");
    }
}