import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { IFuncionario } from "../models";


export const seed = async(knex: Knex) =>{
    const [{ count }] = await knex(ETableNames.funcionario).count<[{ count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;
    
    const funcionariosToInsert = funcionarios;
    await knex(ETableNames.funcionario).insert(funcionariosToInsert);
}

const funcionarios: IFuncionario[] = [
    {
        id: 1,
        nome: 'José Eduardo',
        email: 'jose@gmail.com',
        senha: '123456789@Aa'
    },
    {
        id: 2,
        nome: 'Carlos Daniel',
        email: 'carlos@gmail.com',
        senha: '123456789@Aa'
    },
    {
        id: 3,
        nome: 'Cleiton Silva',
        email: 'cleiton@gmail.com',
        senha: '123456789@Aa'
    }
]