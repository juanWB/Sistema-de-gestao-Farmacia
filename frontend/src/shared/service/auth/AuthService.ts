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

        return new Error('Error no login');   
    }catch(error){
        console.log(error);
        return new Error((error as {message: string}).message + ' Error no login')
    }
}   

export const AuthService = {
    entrar,

}