import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthService } from "../service/auth/AuthService";

interface IAuthContextData {
    isAuthenticaded: boolean;

    sair: () => void;
    entrar: (email: string, senha: string) => Promise<string | void | Error>; 
    cadastrar: (nome: string, email: string, senha: string) => Promise<number | Error>; 
}

const AuthContext = createContext({} as IAuthContextData);

export const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthContextProvider{
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<IAuthContextProvider> = ({children}) => {
    const [accessToken, setAccessToken] = useState<string>();

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if(accessToken){
            setAccessToken(accessToken);
        }else{
            setAccessToken(undefined);
        }
    },[])

    const handleCadastrar = useCallback(async(nome: string, email: string, senha: string) => {
        const result = await AuthService.cadastrar(nome, email, senha);

        if(result instanceof Error){
            return new Error(result.message);
        }

        return result;
    },[]);

    const handleEntrar = useCallback(async(email: string, senha: string) => {
        const result = await AuthService.entrar(email, senha);

        if(result instanceof Error){
            return new Error(result.message);
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, result.accessToken);
            setAccessToken(result.accessToken);
        }
    }, []);

    const isAuthenticaded = useMemo(() => !!accessToken, [accessToken]);

    const handleSair = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        setAccessToken(undefined);
    }

    return(
        <AuthContext.Provider value={{cadastrar: handleCadastrar, entrar: handleEntrar, sair: handleSair, isAuthenticaded }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);