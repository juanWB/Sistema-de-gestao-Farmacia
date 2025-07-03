import { Enviroments } from "../../../enviroments";
import { Api } from "../axiosConfig";

interface IListagemEntrada {
  id: number;
  produto_id: number;
  quantidade: number;
  entrada_data: Date | string;
}

type TEntradaComTotalCount = {
  data: IListagemEntrada;
  totalCount: number;
};

const getAll = async (page: number, filter = ""):Promise<TEntradaComTotalCount | Error> => {
  try {
    const urlRelativa = `/entradas&_page=${page}&_limit=${Enviroments.LIMITE_DE_LINHAS}&entrada_data=${filter}`;

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

const create = async (entrada: Omit<IListagemEntrada, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListagemEntrada>("/entrada", entrada);

    if(data){
      return data.id;
    }

    return new Error("Erro ao criar registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao criar registro");
  }
};

export const entradaService = {
  create,
  getAll,
};
