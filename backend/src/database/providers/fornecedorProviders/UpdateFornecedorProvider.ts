import { logger } from "../../../shared/logger";
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
            logger.info(`Fornecedor com id ${id} atualizada com sucesso`);
            return result;
        }
    
        logger.warn(`UpdateFornecedorProvider falhou em atualizar categoria com id ${id}`);
        return new Error("Error ao atualizar fornecedor")
    }catch(err){
        logger.error(`UpdateFornecedorProvider falhou em atualizar categoria: ${JSON.stringify(err)}`);
        return new Error("Error ao atualizar fornecedor")
    }
}