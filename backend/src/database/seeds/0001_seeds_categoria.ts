import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { ICategoria } from "../models";


export const seed = async(knex: Knex) =>{
    const [{ count }] = await knex(ETableNames.categoria).count<[{ count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;
    
    const categoriasToInsert = categorias;
    await knex(ETableNames.categoria).insert(categoriasToInsert);
}

const categorias: ICategoria[] = [
    {
        id: 1,
        nome: 'Medicamentos'
    },
    {
        id: 2,
        nome: 'Cosméticos',
    },
    {
        id: 3,
        nome: 'Fitness',
    },
    {
        id: 4,
        nome: 'Higiene Pessoal',
    },
    {
        id: 5,
        nome: 'Cuidados com a Pele',
    },
    {
        id: 6,
        nome: 'Vitaminas e Suplementos',
    },
    {
        id: 7,
        nome: 'Infantil',
    },
    {
        id: 8,
        nome: 'Primeiros Socorros',
    },
    {
        id: 9,
        nome: 'Saúde Bucal',
    },
    {
        id: 10,
        nome: 'Bem-Estar Sexual',
    },
    {
        id: 11,
        nome: 'Perfumaria',
    },
    {
        id: 12,
        nome: 'Dermocosméticos',
    }
]
