import { Router } from "express";
import { controllerFornecedor } from "../controllers/controllerFornecedor";
const routerFornecedor = Router();

//Rotas Fornecedor
routerFornecedor.post('/fornecedor',controllerFornecedor.createFornecedorValidation, controllerFornecedor.createFornecedor);
routerFornecedor.put('/fornecedor/:id', controllerFornecedor.updateFornecedorValidation, controllerFornecedor.updateFornecedor);
routerFornecedor.delete('/fornecedor/:id', controllerFornecedor.deleteFornecedorValidation, controllerFornecedor.deleteFornecedor);
routerFornecedor.get('/fornecedor',controllerFornecedor.getAllFornecedorValidation ,controllerFornecedor.GetAllFornecedor);

export {routerFornecedor}