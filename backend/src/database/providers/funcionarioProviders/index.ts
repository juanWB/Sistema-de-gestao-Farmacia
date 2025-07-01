import * as createFuncionario from './CreateFuncionarioProvider';
import * as getFuncionarioByEmail from './GetFuncionarioByEmailProvider';

export const FuncionarioProvider = {
    ...createFuncionario,
    ...getFuncionarioByEmail,
}