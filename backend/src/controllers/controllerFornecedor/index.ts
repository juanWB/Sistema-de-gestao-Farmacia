import * as create from './CreateFornecedor.';
import * as getAll from './GetAllFornecedor';
import * as getById from './GetFornecedorById';
import * as update from './UpdateFornecedor';
import * as remove from './DeleteFornecedor';

export const controllerFornecedor = {
    ...create,
    ...getAll,
    ...getById,
    ...update,
    ...remove
};