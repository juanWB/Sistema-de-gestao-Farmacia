import * as create from './CreateFuncionario';
import * as update from './UpdateFuncionario';
import * as getById from './GetFuncionarioById';

export const controllerFuncionario = {
    ...create,
    ...update,
    ...getById,
};