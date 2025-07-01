import { Router } from "express";
import { controllerFornecedor } from "../controllers/controllerFornecedor";
const routerFornecedor = Router();

//Rotas Fornecedor
routerFornecedor.get('/fornecedor',controllerFornecedor.getAllFornecedorValidation ,controllerFornecedor.getAllFornecedor);
routerFornecedor.post('/fornecedor',controllerFornecedor.createFornecedorValidation, controllerFornecedor.createFornecedor);
routerFornecedor.get('/fornecedor/:id',controllerFornecedor.getFornecedorByIdValidation ,controllerFornecedor.getFornecedorById);
routerFornecedor.put('/fornecedor/:id', controllerFornecedor.updateFornecedorValidation, controllerFornecedor.updateFornecedor);
routerFornecedor.delete('/fornecedor/:id', controllerFornecedor.deleteFornecedorValidation, controllerFornecedor.deleteFornecedor);

export {routerFornecedor}