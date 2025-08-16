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
    },
    {
        id: 4,
        nome: 'Vitamina C 500mg',
        preco: 25.50,
        validade: '2027-01-01',
        quantidade: 80,
        categoria_id: 6,
        fornecedor_id: 4,
    },
    {
        id: 5,
        nome: 'Sabonete Líquido',
        preco: 9.90,
        validade: '2025-11-15',
        quantidade: 120,
        categoria_id: 4,
        fornecedor_id: 5,
    },
    {
        id: 6,
        nome: 'Protetor Solar FPS 50',
        preco: 49.90,
        validade: '2025-12-20',
        quantidade: 50,
        categoria_id: 5,
        fornecedor_id: 6,
    },
    {
        id: 7,
        nome: 'Fralda Infantil P',
        preco: 39.99,
        validade: '2026-08-08',
        quantidade: 200,
        categoria_id: 7,
        fornecedor_id: 7,
    },
    {
        id: 8,
        nome: 'Curativo Adesivo',
        preco: 5.49,
        validade: '2028-03-03',
        quantidade: 500,
        categoria_id: 8,
        fornecedor_id: 9,
    },
    {
        id: 9,
        nome: 'Enxaguante Bucal',
        preco: 19.90,
        validade: '2025-09-01',
        quantidade: 90,
        categoria_id: 9,
        fornecedor_id: 8,
    },
    {
        id: 10,
        nome: 'Perfume Floral 100ml',
        preco: 89.90,
        validade: '2027-04-04',
        quantidade: 40,
        categoria_id: 11,
        fornecedor_id: 10,
    }
]
