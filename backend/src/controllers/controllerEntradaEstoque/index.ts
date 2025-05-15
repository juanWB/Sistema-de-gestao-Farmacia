import * as create from './CreateEntradaEstoque';
import * as getAll from './GetAllEntradaEstoque';

export const controllerEntradaEstoque = {
    ...create,
    ...getAll
};