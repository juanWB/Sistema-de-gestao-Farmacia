import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { ISaidaEstoque } from "../models";


export const seed = async(knex: Knex) =>{
    const [{ count }] = await knex(ETableNames.saidaEstoque).count<[{ count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;
    
    const saidasEstoqueToInsert = saidasEstoque;
    await knex(ETableNames.saidaEstoque).insert(saidasEstoqueToInsert);
}

const saidasEstoque: ISaidaEstoque[] = [
    {
        id: 1,
        produto_id: 1,
        quantidade: 5,
        saida_data: '2025-06-20',
    },
    {
        id: 2,
        produto_id: 2,
        quantidade: 10,
        saida_data: '2025-06-25',
    },
    {
        id: 3,
        produto_id: 3,
        quantidade: 4,
        saida_data: '2025-06-26',
    },
    {
        id: 4,
        produto_id: 7,
        quantidade: 15,
        saida_data: '2025-07-02',
    },
    {
        id: 5,
        produto_id: 5,
        quantidade: 30,
        saida_data: '2025-07-05',
    },
    {
        id: 6,
        produto_id: 1,
        quantidade: 8,
        saida_data: '2025-07-10',
    },
    {
        id: 7,
        produto_id: 9,
        quantidade: 6,
        saida_data: '2025-07-12',
    },
    {
        id: 8,
        produto_id: 10,
        quantidade: 2,
        saida_data: '2025-07-15',
    }
]
