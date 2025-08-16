import * as getEntradaById from "./GetEntradaByIdProvider";
import * as createEntrada from "./CreateEntradaProvider";
import * as getEntrada from "./GetAllEntradaProvider";
import * as count from "./Count";

export const EntradaEstoqueProvider = {
    ...createEntrada,
    ...getEntrada,
    ...getEntradaById,
    ...count
}