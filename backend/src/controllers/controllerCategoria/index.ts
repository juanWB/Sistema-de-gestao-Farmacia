import * as create from './CreateCategoria';
import * as getAll from './GetAllCategoria';
import * as update from './UpdateCategoria';
import * as remove from './DeleteCategoria';

export const controllerCategoria = {
    ...create,
    ...getAll,
    ...update,
    ...remove
};