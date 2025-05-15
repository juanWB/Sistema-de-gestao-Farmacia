import { Router } from "express";
import { controllerFornecedor } from "../controllers/controllerFornecedor";
const router = Router();

//Rotas Fornecedor
router.post('/',controllerFornecedor.createFornecedorValidation, controllerFornecedor.CreateFornecedor);
router.get('/', controllerFornecedor.GetAllFornecedor);
router.put('/:id', controllerFornecedor.updateFornecedorValidation, controllerFornecedor.UpdateFornecedor);
router.delete('/:id', controllerFornecedor.deleteFornecedorValidation, controllerFornecedor.DeleteFornecedor);

export {router}