import { Router } from "express";
import { controllerProduto } from "../controllers/controllerProduto";
const routerProduto = Router();

//Rotas Produto
routerProduto.get('/produto/:id', controllerProduto.getProdutoByIdValidation, controllerProduto.getProdutoById);
routerProduto.get('/produto', controllerProduto.getAllProdutosValidation,controllerProduto.getAllProdutos);
routerProduto.post('/produto',controllerProduto.createProdutoValidation, controllerProduto.createProduto);
routerProduto.put('/produto/:id', controllerProduto.updateProdutoValidation, controllerProduto.updateProdutoById);
routerProduto.delete('/produto/:id', controllerProduto.deleteProdutoValidation, controllerProduto.deleteProduto);

export {routerProduto}