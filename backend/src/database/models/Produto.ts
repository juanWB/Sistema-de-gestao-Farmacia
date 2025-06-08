export interface IProduto {
  id: number;
  nome: string;
  preco: number;
  validade: Date | string;
  quantidade: number;
  categoria_id: number;
  fornecedor_id: number;
}
