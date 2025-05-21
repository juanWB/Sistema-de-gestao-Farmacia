import { Router } from "express";
import { controllerFornecedor } from "../controllers/controllerFornecedor";
const routerFornecedor = Router();

//Rotas Fornecedor
routerFornecedor.post('/fornecedor',controllerFornecedor.createFornecedorValidation, controllerFornecedor.CreateFornecedor);
routerFornecedor.get('/fornecedor', controllerFornecedor.GetAllFornecedor);
routerFornecedor.put('/fornecedor/:id', controllerFornecedor.updateFornecedorValidation, controllerFornecedor.UpdateFornecedor);
routerFornecedor.delete('/fornecedor/:id', controllerFornecedor.deleteFornecedorValidation, controllerFornecedor.DeleteFornecedor);

export {routerFornecedor}