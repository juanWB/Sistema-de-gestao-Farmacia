import { Router } from "express";
import { controllerFornecedor } from "../controllers/controllerFornecedor";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerFornecedor = Router();

routerFornecedor.get('/fornecedores', verifyAuthentication, controllerFornecedor.getAllFornecedorValidation ,controllerFornecedor.getAllFornecedor);
routerFornecedor.post('/fornecedores', verifyAuthentication, controllerFornecedor.createFornecedorValidation, controllerFornecedor.createFornecedor);
routerFornecedor.get('/fornecedores/:id', verifyAuthentication, controllerFornecedor.getFornecedorByIdValidation ,controllerFornecedor.getFornecedorById);
routerFornecedor.put('/fornecedores/:id', verifyAuthentication,  controllerFornecedor.updateFornecedorValidation, controllerFornecedor.updateFornecedor);
routerFornecedor.delete('/fornecedores/:id', verifyAuthentication,  controllerFornecedor.deleteFornecedorValidation, controllerFornecedor.deleteFornecedor);

export {routerFornecedor}