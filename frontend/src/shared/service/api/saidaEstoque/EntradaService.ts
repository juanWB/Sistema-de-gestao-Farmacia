import { Enviroments } from "../../../enviroments";
import { Api } from "../axiosConfig";

interface IListagemSaida {
  id: number;
  produto_id: number;
  quantidade: number;
  saida_data: Date | string;
}

type TSaidaComTotalCount = {
  data: IListagemSaida;
  totalCount: number;
};

const getAll = async (
  page: number,
  filter = ""
): Promise<TSaidaComTotalCount | Error> => {
  try {
    const urlRelativa = `/saida&_page=${page}&_limit=${Enviroments.LIMITE_DE_LINHAS}&saida_data=${filter}`;

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

const create = async (saida: Omit<IListagemSaida, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListagemSaida>("/saida", saida);

    if(data){
      return data.id;
    }

    return new Error("Erro ao criar registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao criar registro");
  }
};

export const saidaService = {
  create,
  getAll,
};
