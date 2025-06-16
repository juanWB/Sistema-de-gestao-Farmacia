import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const GetFuncionarioByIdProvider = async(id: number):Promise<IFuncionario | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario).where('id', id).select('*');

        if(result){
            return result
        }
        
        return new Error('funcionario não encontrado');
    }catch(err){
        console.log(err);
        return new Error('Erro ao buscar funcionario');
    }
}