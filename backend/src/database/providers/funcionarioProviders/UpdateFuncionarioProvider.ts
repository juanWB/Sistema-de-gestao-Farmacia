import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";


export const UpdateFuncionarioProvider = async(funcionario: IFuncionario):Promise< IFuncionario | Error> => {
    try{
        const [result] = await Knex(ETableNames.funcionario)
        .where('id',funcionario.id)
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