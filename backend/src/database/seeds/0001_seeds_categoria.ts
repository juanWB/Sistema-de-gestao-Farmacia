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
    }
]