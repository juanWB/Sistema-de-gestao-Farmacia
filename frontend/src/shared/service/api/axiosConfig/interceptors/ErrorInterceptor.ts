import type { AxiosError } from "axios";


export const errorInterceptor = (error: AxiosError) => {

    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conexão.'));
    }

    if(error.response?.status === 401){
        return Promise.reject(new Error ('E-mail ou senha incorretos'));
    }

    if(error.response?.status === 400){
        return Promise.reject(new Error('Algo deu errado, verifique os dados e tente novamente.'));
    }

    return Promise.reject(error);
}