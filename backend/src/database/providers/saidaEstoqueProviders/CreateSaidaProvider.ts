import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ISaidaEstoque } from "../../models";


export const CreateSaidaProvider = async(saida: Omit<ISaidaEstoque, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.saidaEstoque).insert(saida).returning('id');
        
        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        throw new Error("Error ao criar nova saida do estoque");
    }catch(err){
        console.log(err);
        throw new Error("Error ao criar nova saida do estoque");
    }
}