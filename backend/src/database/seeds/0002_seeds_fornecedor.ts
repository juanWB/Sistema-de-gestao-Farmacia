import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { IFornecedor } from "../models";


export const seed = async(knex: Knex) =>{
    const [{ count }] = await knex(ETableNames.fornecedor).count<[{ count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;
    
    const fornecedoresToInsert = fornecedores;
    await knex(ETableNames.fornecedor).insert(fornecedoresToInsert);
}

const fornecedores: IFornecedor[] = [
    {
        id: 1,
        nome: 'Bob Alimentos',
        cnpj: '12345678912345',
        telefone: '08199999999',
        endereco: 'Rua Major',
    },
    {
        id: 2,
        nome: 'Zap Remedios',
        cnpj: '12345678912347',
        telefone: '04199999999',
        endereco: 'Rua Marechal',
    },
    {
        id: 3,
        nome: 'FlashBeauty',
        cnpj: '12345678912344',
        telefone: '02199999999',
        endereco: 'Rua Coronel',
    }
]