import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEntradaEstoque } from "../../models";


export const CreateEntradaProvider = async(entrada: Omit<IEntradaEstoque, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.entradaEstoque).insert(entrada).returning('id');
        
        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        return new Error("Error ao criar nova entrada no estoque");
    }catch(err){
        console.log(err);
        return new Error("Error ao criar nova entrada no estoque");
    }
}