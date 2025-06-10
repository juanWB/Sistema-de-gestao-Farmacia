import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const GetFuncionarioProvider = async():Promise<IFuncionario[] | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario).select('*');

        if(result > 0){
            return result;
        }

        throw new Error('Error ao buscar funcionarios.');
    }catch(err){
        console.log(err);
        throw new Error('Error ao buscar funcionarios.');
    }
}