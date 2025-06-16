import { Router } from "express";
import { controllerProduto } from "../controllers/controllerProduto";
const routerProduto = Router();

//Rotas Produto
routerProduto.get('/produto/:id', controllerProduto.getProdutoByIdValidation, controllerProduto.GetProdutoById);
routerProduto.get('/produto', controllerProduto.getAllProdutosValidation,controllerProduto.GetAllProdutos);
routerProduto.post('/produto',controllerProduto.createProdutoValidation, controllerProduto.CreateProduto);
routerProduto.put('/produto/:id', controllerProduto.updateProdutoValidation, controllerProduto.UpdateProdutoById);
routerProduto.delete('/produto/:id', controllerProduto.deleteProdutoValidation, controllerProduto.DeleteProduto);

export {routerProduto}