import { Router } from "express";
import { controllerProduto } from "../controllers/controllerProduto";
const routerProduto = Router();

//Rotas Produto
routerProduto.post('/',controllerProduto.createProdutoValidation, controllerProduto.CreateProduto);
routerProduto.get('/', controllerProduto.GetAllProdutos);
routerProduto.get('/:id', controllerProduto.getProdutoByIdValidation, controllerProduto.GetProdutoById);
routerProduto.put('/:id', controllerProduto.updateProdutoValidation, controllerProduto.UpdateProdutoById);
routerProduto.delete('/:id', controllerProduto.deleteProdutoValidation, controllerProduto.DeleteProduto);

export {routerProduto}