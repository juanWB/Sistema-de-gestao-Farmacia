import * as createEntrada from "./CreateEntradaProvider";
import * as getEntrada from "./GetEntradaProvider";
import * as count from "./Count";

export const EntradaEstoqueProvider = {
    ...createEntrada,
    ...getEntrada,
    ...count
}