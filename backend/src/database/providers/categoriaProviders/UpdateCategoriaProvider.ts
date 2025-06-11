import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICategoria } from "../../models";


export const UpdateCategoriaProvider = async(id: number, categoria: Omit<ICategoria, 'id'>):Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.categoria)
                                .where('id',id)
                                .update({'nome': categoria.nome})
                                .returning('*');

        if(result){
            return result
        }
    
        throw new Error("Error ao buscar atualizar categoria")
    }catch(err){
        console.log(err);
        throw new Error("Error ao buscar atualizar categoria")
    }
}