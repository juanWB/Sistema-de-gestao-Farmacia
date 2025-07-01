interface IListagemFornecedor{
    id: number,
    cnpj: string,
    nome: string,
    endereco: string
}

const getAll = async(filter: '') => {

}


export const fornecedorService = {
    create,
    getAll,
    deleteById,
    updateById
}