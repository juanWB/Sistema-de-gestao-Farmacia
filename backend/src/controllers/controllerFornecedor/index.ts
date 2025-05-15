import * as create from './CreateFornecedor.';
import * as getAll from './GetAllFornecedor';
import * as update from './UpdateFornecedor';
import * as remove from './DeleteFornecedor';

export const controllerFornecedor = {
    ...create,
    ...getAll,
    ...update,
    ...remove
};