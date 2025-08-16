import { Enviroments } from "../../../enviroments";
import { Api } from "../axiosConfig";

interface IListagemFornecedor {
  id: number;
  nome: string;
  cnpj: string;
  telefone: string;
  endereco: string;
}

type TFornecedorComCount = {
  data: IListagemFornecedor[];
  totalCount: number;
};

const getAll = async (page: number, filter= ''): Promise<TFornecedorComCount | Error> => {
  try {
    const urlRelativa = `/fornecedores?_page=${page}&_limit=${Enviroments.LIMITE_DE_LINHAS}&filter=${filter}`;

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

const getById = async (id: number): Promise<IListagemFornecedor | Error> => {
  try {
    const { data } = await Api.get(`/fornecedores/${id}`);

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

const create = async (fornecedor: Omit<IListagemFornecedor, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListagemFornecedor>("/fornecedores", fornecedor);

    if (data) {
      return data.id;
    }

    return new Error("Error ao criar registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao criar registro"
    );
  }
};

const updateById = async (id: number, fornecedor: Omit<IListagemFornecedor, "id">): Promise<void | Error> => {
  try {
    await Api.put(`/fornecedores/${id}`, fornecedor);

    return new Error("Error ao atualizar registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao atualizar registros"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/fornecedores/${id}`);

    return new Error("Error ao deletar registro");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error ao deletar registro");
  }
};

export const fornecedorService = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
