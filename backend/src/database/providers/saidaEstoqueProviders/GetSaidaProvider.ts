import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ISaidaEstoque } from "../../models";



export const GetSaidaProvider = async():Promise<ISaidaEstoque[] | Error> => {
    try{
        const [result] = await Knex(ETableNames.saidaEstoque).select('*');

        if(result.length > 0){
            return result
        }

        throw new Error('Nenhuma saída do estoque encontrada.');
    }catch(err){
        console.log(err)
        throw new Error('Nenhuma saída do estoque encontrada.');
    }
}