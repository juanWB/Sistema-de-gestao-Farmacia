import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFornecedor } from "../../models";


export const UpdateFornecedorProvider = async(id: number, fornecedor: Omit<IFornecedor, 'id'>) => {
    try{
        const [result] = await Knex(ETableNames.fornecedor)
        .where('id',id)
        .update({'nome': fornecedor.nome,
                    'cnpj': fornecedor.cnpj,
                    'telefone': fornecedor.telefone,
                    'endereco': fornecedor.endereco
        })
        .returning('*');

        if(result){
            return result
        }
    
        return new Error("Error ao atualizar fornecedor")
    }catch(err){
        console.log(err);
        return new Error("Error ao atualizar fornecedor")
    }
}