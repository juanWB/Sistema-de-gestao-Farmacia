import * as createFuncionario from './CreateFuncionarioProvider';
import * as getByIdFuncionario from './GetFuncionarioByIdProvider';
import * as updateFuncionario from './UpdateFuncionarioProvider';
import * as getAllFuncionario from './GetAllFuncionarioProvider';
import * as deleteFuncionario from './DeleteFuncionarioProvider';
import * as count from './Count';

export const FuncionarioProvider = {
    ...createFuncionario,
    ...getByIdFuncionario,
    ...updateFuncionario,
    ...getAllFuncionario,
    ...count,
    ...deleteFuncionario
}