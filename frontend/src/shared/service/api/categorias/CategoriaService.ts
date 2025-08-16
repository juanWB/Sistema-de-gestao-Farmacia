import { Api } from "../axiosConfig";

interface IListagemCategorias {
    id: number;
    nome: string;
}


const getAll = async(filter = ''):Promise<IListagemCategorias[] | Error> => {
    try{
        
        const { data } = await Api.get(`/categorias?filter_like=${filter}`);
        
        if(data){
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