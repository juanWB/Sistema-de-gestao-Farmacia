import * as create from './CreateSaidaEstoque';
import * as getAll from './GetAllSaidaEstoque';

export const controllerSaidaEstoque = {
    ...create,
    ...getAll
};