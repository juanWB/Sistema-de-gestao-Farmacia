import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEntradaEstoque } from "../../models";


export const GetEntradaProvider = async():Promise<IEntradaEstoque[] | Error> => {
    try{
        const [result] = await Knex(ETableNames.entradaEstoque).select('*')

        if(result.length > 0){
            return result
        }
    
        throw new Error("Error ao buscar categoria")
    }catch(err){
        console.log(err);
        throw new Error("Error ao buscar categoria")
    }
}