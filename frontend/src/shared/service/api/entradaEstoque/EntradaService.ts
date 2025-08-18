import { Enviroments } from "../../../enviroments";
import { Api } from "../axiosConfig";

export interface IListagemEntrada {
  id: number;
  produto_id: number;
  quantidade: number;
  entrada_data?: Date | string;
}

type TEntradaComTotalCount = {
  data: IListagemEntrada[];
  totalCount: number;
};

const getAll = async (page: number, filter = ""):Promise<TEntradaComTotalCount | Error> => {
  try {
    const urlRelativa = `/entradas?page=${page}&limit=${Enviroments.LIMITE_DE_LINHAS}&filter=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Enviroments.LIMITE_DE_LINHAS
        ),
      };
    }

    return new Error("Error ao buscar registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao buscar registros"
    );
  }
};

const getById = async (id: number): Promise<IListagemEntrada | Error> => {
  try {
    const { data } = await Api.get(`/entradas/${id}`);

    if (data) {
      return data;
    }

    return new Error("Error ao buscar registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao buscar registro"
    );
  }
};

const create = async (entrada: Omit<IListagemEntrada, 'id' | 'entrada_data'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListagemEntrada>("/entradas", entrada);

    if(data){
      return data.id;
    }

    return new Error("Erro ao criar registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao criar registro");
  }
};

const updateById = async (id: number, entrada: Omit<IListagemEntrada, 'id' | 'entrada_data'>): Promise<void | Error> => {
  try {
    const result = await Api.put(`/entradas/${id}`, entrada);

    if(result instanceof Error){
      return new Error("Error ao atualizar registro");
    }
    
    return;
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao atualizar registros"
    );
  }
};

const deleteById = async (id: number):Promise<void | Error> => {
try {
    const result = await Api.delete(`/entradas/${id}`);

    if(result instanceof Error){
      return new Error("Error ao deletar registro");
    }

    return;
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao deletar registro"
    );
  }    
};


export const entradaService = {
  create,
  getAll,
  getById,
  deleteById,
  updateById
};
