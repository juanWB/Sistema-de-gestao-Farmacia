import * as createProduto from './CreateProdutoProvider';
import * as deleteProduto from './DeleteProdutoProvider';
import * as updateProduto from './UpdateProdutoProvider';
import * as getProdutoById from './GetProdutoByIdProvider';
import * as getProduto from './GetProdutoProvider';

export const ProdutoProvider = {
    ...createProduto,
    ...deleteProduto,
    ...getProduto,
    ...getProdutoById,
    ...updateProduto

}