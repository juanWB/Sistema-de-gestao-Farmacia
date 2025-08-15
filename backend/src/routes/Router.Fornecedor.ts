import { Router } from "express";
import { controllerFornecedor } from "../controllers/controllerFornecedor";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerFornecedor = Router();

routerFornecedor.get('/fornecedor', verifyAuthentication, controllerFornecedor.getAllFornecedorValidation ,controllerFornecedor.getAllFornecedor);
routerFornecedor.post('/fornecedor', verifyAuthentication, controllerFornecedor.createFornecedorValidation, controllerFornecedor.createFornecedor);
routerFornecedor.get('/fornecedor/:id', verifyAuthentication, controllerFornecedor.getFornecedorByIdValidation ,controllerFornecedor.getFornecedorById);
routerFornecedor.put('/fornecedor/:id', verifyAuthentication,  controllerFornecedor.updateFornecedorValidation, controllerFornecedor.updateFornecedor);
routerFornecedor.delete('/fornecedor/:id', verifyAuthentication,  controllerFornecedor.deleteFornecedorValidation, controllerFornecedor.deleteFornecedor);

export {routerFornecedor}