import * as create from './CreateFuncionario';
import * as update from './UpdateFuncionario';
import * as getById from './GetFuncionarioById';
import * as getAll from  './GetAllFuncionario';
import * as deleteById from './DeleteFuncionario';

export const controllerFuncionario = {
    ...create,
    ...update,
    ...getById,
    ...getAll,
    ...deleteById
};