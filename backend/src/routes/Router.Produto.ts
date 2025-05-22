import { Router } from "express";
import { controllerProduto } from "../controllers/controllerProduto";
const routerProduto = Router();

//Rotas Produto
routerProduto.post('/produto',controllerProduto.createProdutoValidation, controllerProduto.CreateProduto);
routerProduto.get('/produto', controllerProduto.GetAllProdutos);
routerProduto.get('/produto/:id', controllerProduto.getProdutoByIdValidation, controllerProduto.GetProdutoById);
routerProduto.put('/produto/:id', controllerProduto.updateProdutoValidation, controllerProduto.UpdateProdutoById);
routerProduto.delete('/produto/:id', controllerProduto.deleteProdutoValidation, controllerProduto.DeleteProduto);

export {routerProduto}