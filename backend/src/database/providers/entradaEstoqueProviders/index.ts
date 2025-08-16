import * as getEntradaById from "./GetEntradaByIdProvider";
import * as createEntrada from "./CreateEntradaProvider";
import * as updateEntrada from "./UpdateEntradaProvider";
import * as deleteEntrada from "./DeleteEntradaEstoqueProvider";
import * as getEntrada from "./GetAllEntradaProvider";
import * as count from "./Count";

export const EntradaEstoqueProvider = {
    ...getEntradaById,
    ...createEntrada,
    ...updateEntrada,
    ...deleteEntrada,
    ...getEntrada,
    ...count
}