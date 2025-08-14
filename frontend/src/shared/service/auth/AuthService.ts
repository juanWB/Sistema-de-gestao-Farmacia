import { Api } from "../api/axiosConfig";


interface IAuth{
    accessToken: string;
}

const entrar = async(email: string, senha: string):Promise<IAuth | Error> => {
    try{
        const { data } = await Api.post('/entrar', {email, senha});

        if(data){
            return data;
        }

        return new Error('Error na tentativa de login');   
    }catch(error){
        console.log(error);
        return new Error((error as {message: string}).message + ' Error na tentativa de login')
    }
}  

const cadastrar = async(nome: string, email: string, senha: string):Promise<number | Error> => {
    try{
        const { data } = await Api.post('/cadastrar', { nome, email, senha });
        
        if(data){
            return data;
        }
        
        return new Error('Error na tentativa de cadastro')
    }catch(error){
        console.log(error);
        return new Error((error as {message: string}).message + 'Error na tentativa de cadastro');
    }
}

export const AuthService = {
    entrar,
    cadastrar
}