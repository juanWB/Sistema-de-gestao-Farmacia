import { Enviroments } from "../../../enviroments";
import { Api } from "../axiosConfig";

interface IListagemProduto {
  id: number;
  nome: string;
  preco: number;
  validade: Date | string;
  quantidade: number;
  categoria_id: number;
  fornecedor_id: number;
}

type TProdutoComCount = {
  data: IListagemProduto[];
  totalCount: number;
};

const getAll = async (page: number, filter: string | ""): Promise<TProdutoComCount | Error> => {
  try {
    const urlRelativa = `/produtos?page=${page}&_limit=${Enviroments.LIMITE_DE_LINHAS}&nome=${filter}`;

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

const getById = async (id: number): Promise<IListagemProduto | Error> => {
  try {
    const { data } = await Api.get(`/produtos/${id}`);

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

const create = async (produto: Omit<IListagemProduto, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListagemProduto>("/produtos", produto);

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

const updateById = async (id: number, produto: Omit<IListagemProduto, 'id'>): Promise<void | Error> => {
  try {
    await Api.put(`/produtos/${id}`, produto);

    return new Error("Error ao atualizar registro")
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao atualizar registros"
    );
  }
};

const deleteById = async (id: number):Promise<void | Error> => {
try {
    await Api.delete(`/produtos/${id}`);

    return new Error("Error ao deletar registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao deletar registro"
    );
  }    
};

export const produtoService = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
