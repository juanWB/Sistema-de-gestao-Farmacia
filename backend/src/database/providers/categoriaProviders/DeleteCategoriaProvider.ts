import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const DeleteCategoriaProvider = async(id: number):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.categoria).where('id', id).del()

        if(result > 0)return;
       

        return new Error("Error ao deletar categoria")
    }catch(err){
        console.log(err);
        return new Error("Error ao deletar categoria")
    }
}