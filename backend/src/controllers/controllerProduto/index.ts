import * as create from './CreateProduto';
import * as getAll from './GetAllProduto';
import * as getById from './GetProdutoById';
import * as update from './UpdateProduto';
import * as remove from './DeleteProduto';

export const controllerProduto = {
    ...create,
    ...getAll,
    ...getById,
    ...update,
    ...remove
};