import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const DeleteProdutoProvider = async(id: number):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.produto).where('id', id).del()

        if(result > 0)return;

        return new Error("Error ao tentar deletar .produto")
    }catch(err){
        console.log(err);
        return new Error("Error ao tentar deletar .produto")
    }
}