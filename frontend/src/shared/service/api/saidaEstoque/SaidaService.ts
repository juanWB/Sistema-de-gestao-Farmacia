import { Enviroments } from "../../../enviroments";
import { Api } from "../axiosConfig";

export interface IListagemSaida {
  id: number;
  produto_id: number;
  quantidade: number;
  saida_data?: Date | string;
}

type TSaidaComTotalCount = {
  data: IListagemSaida[];
  totalCount: number;
};

const getAll = async (page: number, filter = ""):Promise<TSaidaComTotalCount | Error> => {
  try {
    const urlRelativa = `/saidas?page=${page}&limit=${Enviroments.LIMITE_DE_LINHAS}&filter=${filter}`;

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

const getById = async (id: number): Promise<IListagemSaida | Error> => {
  try {
    const { data } = await Api.get(`/saidas/${id}`);

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

const create = async (saida: Omit<IListagemSaida, 'id' | 'saida_data'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListagemSaida>("/saidas", saida);

    if(data){
      return data.id;
    }

    return new Error("Erro ao criar registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao criar registro");
  }
};

const updateById = async (id: number, saida: Omit<IListagemSaida, 'id' | 'saida_data'>): Promise<void | Error> => {
  try {
    const result = await Api.put(`/saidas/${id}`, saida);

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
    const result = await Api.delete(`/saidas/${id}`);

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


export const saidaService = {
  create,
  getAll,
  getById,
  deleteById,
  updateById
};
