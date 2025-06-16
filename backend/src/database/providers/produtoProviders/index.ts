import * as createProduto from './CreateProdutoProvider';
import * as deleteProduto from './DeleteProdutoProvider';
import * as updateProduto from './UpdateProdutoProvider';
import * as getProdutoById from './GetProdutoByIdProvider';
import * as getProduto from './GetProdutoProvider';
import * as count from './Count';

export const ProdutoProvider = {
    ...createProduto,
    ...deleteProduto,
    ...getProduto,
    ...getProdutoById,
    ...updateProduto,
    ...count

}