interface IListagemFornecedor{
    id: number,
    cnpj: string,
    nome: string,
    endereco: string
}

type TFornecedorComCount = {
    data: IListagemFornecedor,
    totalCount: number
}

const getAll = async(filter: ''):Promise<TFornecedorComCount[] | Error> => {

}

const getById = async(id: number) => {

}

const create = async() => {

}

const updateById = async() => {
    
}
const deleteById = async() => {
    
}



export const fornecedorService = {
    create,
    getAll,
    getById,
    deleteById,
    updateById
}