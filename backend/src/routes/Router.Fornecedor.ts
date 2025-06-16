import { Router } from "express";
import { controllerFornecedor } from "../controllers/controllerFornecedor";
const routerFornecedor = Router();

//Rotas Fornecedor
routerFornecedor.post('/fornecedor',controllerFornecedor.createFornecedorValidation, controllerFornecedor.CreateFornecedor);
routerFornecedor.put('/fornecedor/:id', controllerFornecedor.updateFornecedorValidation, controllerFornecedor.UpdateFornecedor);
routerFornecedor.delete('/fornecedor/:id', controllerFornecedor.deleteFornecedorValidation, controllerFornecedor.DeleteFornecedor);
routerFornecedor.get('/fornecedor',controllerFornecedor.getAllFornecedorValidation ,controllerFornecedor.GetAllFornecedor);

export {routerFornecedor}