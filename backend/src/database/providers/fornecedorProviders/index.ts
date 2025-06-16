import * as createFornecedor from "./CreateFornecedorProvider";
import * as getFornecedor from "./GetFornecedorProvider";
import * as updateFornecedor from "./UpdateFornecedorProvider";
import * as deleteFornecedor from "./DeleteFornecedorProvider";
import * as count from "./Count";


export const FornecedorProvider = {
    ...createFornecedor,
    ...deleteFornecedor,
    ...getFornecedor,
    ...updateFornecedor,
    ...count
}
