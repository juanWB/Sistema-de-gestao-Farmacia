import * as create from './CreateEntradaEstoque';
import * as getAll from './GetAllEntradaEstoque';
import * as getById from './GetEntradaEstoqueById';
import * as deleteById from './DeleteEntradaEstoque';
import * as updateById from './UpdateEntradaEstoque';

export const controllerEntradaEstoque = {
    ...create,
    ...getAll,
    ...getById, 
    ...updateById,
    ...deleteById,
};