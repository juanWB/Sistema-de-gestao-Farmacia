import { IEntradaEstoque, ICategoria, IFornecedor, IProduto, IFuncionario, ISaidaEstoque } from "../../models/index";


declare module 'knex/types/tables'{

    interface Table{
        categorias: ICategoria
        produtos: IProduto
        entradaEstoque: IEntradaEstoque
        fornecedor: IFornecedor
        funcionario: IFuncionario
        saidaEstoque: ISaidaEstoqueEstoque
    }
}