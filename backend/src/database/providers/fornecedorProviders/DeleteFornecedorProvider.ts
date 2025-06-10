import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const DeleteFornecedorProvider = async(id: number):Promise<number | Error> => {
    try{
        const result = await Knex(ETableNames.fornecedor).where('id', id).del()

        if(result > 0){
            return result;
        } 

        throw new Error("Error ao tentar deletar fornecedor")
    }catch(err){
        console.log(err);
        throw new Error("Error ao tentar deletar fornecedor")
    }
}