import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const GetFuncionarioByIdProvider = async(id: number):Promise<IFuncionario[] | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario).where('id', id).select('*');

        if(result > 0){
            return result;
        }

        throw new Error('Error ao buscar funcionarios.');
    }catch(err){
        console.log(err);
        throw new Error('Error ao buscar funcionarios.');
    }
}