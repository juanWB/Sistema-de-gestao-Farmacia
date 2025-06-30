import { Api } from "../api/axiosConfig";

interface IListagemCategorias {
    nome: string;
}


const getAll = async(filter = ''):Promise<IListagemCategorias[] | Error> => {
    try{
        
        const { data } = await Api.get(`/categorias?nome_like=${filter}`);
        
        if(Array.isArray(data)){
            return data;
        }
        return new Error('Erro ao buscar registros.')
    }catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao buscar registros.')
    }
}


export const categoriaService = {
    getAll
}