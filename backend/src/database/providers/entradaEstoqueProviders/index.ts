import * as createEntrada from "./CreateEntradaProvider"
import * as getEntrada from "./GetEntradaProvider"

export const EntradaEstoqueProvider = {
    ...createEntrada,
    ...getEntrada
}