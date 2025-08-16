import { Router } from "express";
import { controllerProduto } from "../controllers/controllerProduto";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerProduto = Router();

routerProduto.get('/produtos/:id', verifyAuthentication, controllerProduto.getProdutoByIdValidation, controllerProduto.getProdutoById);
routerProduto.get('/produtos', verifyAuthentication, controllerProduto.getAllProdutosValidation,controllerProduto.getAllProdutos);
routerProduto.post('/produtos', verifyAuthentication,controllerProduto.createProdutoValidation, controllerProduto.createProduto);
routerProduto.put('/produtos/:id', verifyAuthentication, controllerProduto.updateProdutoValidation, controllerProduto.updateProdutoById);
routerProduto.delete('/produtos/:id', verifyAuthentication, controllerProduto.deleteProdutoValidation, controllerProduto.deleteProduto);

export {routerProduto}