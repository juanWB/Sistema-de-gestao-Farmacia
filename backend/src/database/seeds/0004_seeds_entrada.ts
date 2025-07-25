import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { IEntradaEstoque } from "../models";


export const seed = async(knex: Knex) =>{
    const [{ count }] = await knex(ETableNames.entradaEstoque).count<[{ count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;
    
    const entradasEstoqueToInsert = entradasEstoque;
    await knex(ETableNames.entradaEstoque).insert(entradasEstoqueToInsert);
}

const entradasEstoque: IEntradaEstoque[] = [
    {
        id: 1,
        produto_id: 1,
        quantidade: 50,
        entrada_data: '2025-05-26',
    },
    {
        id: 2,
        produto_id: 2,
        quantidade: 100,
        entrada_data: '2025-05-26',
    },
    {
        id: 3,
        produto_id: 3,
        quantidade: 20,
        entrada_data: '2025-05-26',
    }
]