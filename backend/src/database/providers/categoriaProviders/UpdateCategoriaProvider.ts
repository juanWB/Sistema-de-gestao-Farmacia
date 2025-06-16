import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICategoria } from "../../models";


export const UpdateCategoriaProvider = async(id: number, categoria: Omit<ICategoria, 'id'>):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.categoria)
                                .where('id',id)
                                .update({'nome': categoria.nome})
                              

        if(result > 0)return 
        
        return new Error("Error ao atualizar categoria")
    }catch(err){
        console.log(err);
        return new Error("Error ao atualizar categoria")
    }
}