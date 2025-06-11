import * as createFornecedor from "./CreateFornecedorProvider";
import * as getFornecedor from "./GetFornecedorProvider";
import * as updateFornecedor from "./UpdateFornecedorProvider";
import * as deleteFornecedor from "./DeleteFornecedorProvider";

export const FornecedorProvider = {
    ...createFornecedor,
    ...deleteFornecedor,
    ...getFornecedor,
    ...updateFornecedor
}
