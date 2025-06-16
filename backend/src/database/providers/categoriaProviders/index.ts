import * as createProvider from "./CreateCategoriasProvider";
import * as deleteProvider from "./DeleteCategoriaProvider";
import * as updateProvider from "./UpdateCategoriaProvider";
import * as getProvider from "./GetCategoriaProvider";
import * as count from "./Count";

export const CategoriaProvider = {
    ...createProvider,
    ...deleteProvider,
    ...updateProvider,
    ...getProvider,
    ...count
}