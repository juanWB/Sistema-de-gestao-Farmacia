import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { IProduto } from "../models";


export const seed = async(knex: Knex) =>{
    const [{ count }] = await knex(ETableNames.produto).count<[{ count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;
    
    const produtosToInsert = produtos;
    await knex(ETableNames.produto).insert(produtosToInsert);
}

const produtos: IProduto[] = [
    {
        id: 1,
        nome: 'Dipirona',
        preco: 10.99,
        validade: '2026-06-12',
        quantidade: 100,
        categoria_id: 1,
        fornecedor_id: 2,
    },
    {
        id: 2,
        nome: 'Barra de Cereal',
        preco: 2.99,
        validade: '2026-02-10',
        quantidade: 250,
        categoria_id: 3,
        fornecedor_id: 1,
    },
    {
        id: 3,
        nome: 'Hidratante',
        preco: 15.99,
        validade: '2026-05-10',
        quantidade: 65,
        categoria_id: 2,
        fornecedor_id: 3,
    }
]