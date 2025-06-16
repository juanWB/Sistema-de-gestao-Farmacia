import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const DeleteFuncionarioProvider = async(id: number):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.funcionario).where('id', id).del()

        if(result > 0)return;

        return new Error("Error ao tentar deletar funcionario")
    }catch(err){
        console.log(err);
        return new Error("Error ao tentar deletar funcionario")
    }
}