import * as signIn from './SignInFuncionario';
import * as signUp from './SignUpFuncionario';

export const controllerFuncionario = {
    ...signIn,
    ...signUp,
};