interface IListagemEntrada {
  id: number;
  produto_id: number;
  quantidade: number;
  entrada_data: Date | string;
}

type TEntradaComTotalCount = {
  data: IListagemEntrada;
  count: "x-total-count";
};

const getAll = async (): Promise<TEntradaComTotalCount | Error> => {
  try {
    return new Error("Error ao buscar registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao buscar registros"
    );
  }
};

const create = () => {};

export const entradaService = () => {
  create, getAll;
};
