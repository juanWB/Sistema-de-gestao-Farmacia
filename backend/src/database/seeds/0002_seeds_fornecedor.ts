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
        cnpj: '12345678912349',
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
    },
    {
        id: 4,
        nome: 'NutriVida Suplementos',
        cnpj: '12345678912355',
        telefone: '01198887777',
        endereco: 'Avenida Paulista',
    },
    {
        id: 5,
        nome: 'Higiclean Produtos de Higiene',
        cnpj: '12345678912366',
        telefone: '03197776666',
        endereco: 'Rua das Flores',
    },
    {
        id: 6,
        nome: 'DermCare Cosméticos',
        cnpj: '12345678912377',
        telefone: '06196665555',
        endereco: 'Avenida Central',
    },
    {
        id: 7,
        nome: 'BabySoft Infantil',
        cnpj: '12345678912388',
        telefone: '07195554444',
        endereco: 'Rua dos Ipês',
    },
    {
        id: 8,
        nome: 'OralMax Saúde Bucal',
        cnpj: '12345678912399',
        telefone: '02194443333',
        endereco: 'Rua das Laranjeiras',
    },
    {
        id: 9,
        nome: 'Vital Pharma',
        cnpj: '12345678912400',
        telefone: '04193332222',
        endereco: 'Avenida Brasil',
    },
    {
        id: 10,
        nome: 'PerfumeHouse',
        cnpj: '12345678912411',
        telefone: '05192221111',
        endereco: 'Rua Augusta',
    }
]
