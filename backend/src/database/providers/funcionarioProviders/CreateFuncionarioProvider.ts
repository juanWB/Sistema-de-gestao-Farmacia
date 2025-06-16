import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const CreateFuncionarioProvider = async(funcionario: Omit<IFuncionario, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario).insert(funcionario).returning('id');
        
        if(typeof result === 'object'){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        return new Error("Error ao criar novo funcionario");
    }catch(err){
        console.log(err);
        return new Error("Error ao criar novo funcionario");
    }
}