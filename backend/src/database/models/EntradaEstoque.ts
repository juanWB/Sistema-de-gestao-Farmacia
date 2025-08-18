export interface IEntradaEstoque{
    id: number;
    produto_id: number;
    quantidade: number;
    entrada_data?: Date | string;
}