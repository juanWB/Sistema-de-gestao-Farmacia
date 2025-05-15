import { Router } from "express";
import { controllerProduto } from "../controllers/controllerProduto";
const router = Router();

//Rotas Produto
router.post('/',controllerProduto.createProdutoValidation, controllerProduto.CreateProduto);
router.get('/', controllerProduto.GetAllProdutos);
router.get('/:id', controllerProduto.getProdutoByIdValidation, controllerProduto.GetProdutoById);
router.put('/:id', controllerProduto.updateProdutoValidation, controllerProduto.UpdateProdutoById);
router.delete('/:id', controllerProduto.deleteProdutoValidation, controllerProduto.DeleteProduto);

export {router}