import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const UpdateFuncionarioProvider = async(id: number, funcionario: Omit<IFuncionario, 'id'>):Promise< IFuncionario | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario)
        .where('id',id)
        .update({'nome': funcionario.nome,
            'email': funcionario.email,})
            .returning<IFuncionario[]>('*');

        if(result){
            return result
        }
    
        throw new Error("Error ao atualizar funcionario")
    }catch(err){
        console.log(err);
        throw new Error("Error ao atualizar funcionario")
    }
}