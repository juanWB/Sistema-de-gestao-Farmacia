import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFornecedor } from "../../models";


export const CreateFornecedorProvider = async(fornecedor: Omit<IFornecedor, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.fornecedor).insert(fornecedor).returning('id');
        
        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        return new Error("Error ao criar novo fornecedor ");
    }catch(err){
        console.log(err);
        return new Error("Error ao criar novo fornecedor ");
    }
}