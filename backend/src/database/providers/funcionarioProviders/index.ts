import * as createFuncionario from './CreateFuncionarioProvider';
import * as getByIdFuncionario from './GetFuncionarioByIdProvider';
import * as updateFuncionario from './UpdateFuncionarioProvider';

export const FuncionarioProvider = {
    ...createFuncionario,
    ...getByIdFuncionario,
    ...updateFuncionario
}