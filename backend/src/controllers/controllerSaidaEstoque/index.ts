import * as create from './CreateSaidaEstoque';
import * as getAll from './GetAllSaidaEstoque';
import * as getById from './GetSaidaEstoqueById';
import * as deleteById from './DeleteSaidaEstoque';
import * as updateById from './UpdateSaidaEstoque';

export const controllerSaidaEstoque = {
    ...create,
    ...getAll,
    ...getById,
    ...deleteById,
    ...updateById
};