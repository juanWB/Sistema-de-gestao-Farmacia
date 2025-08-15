import { Router } from "express";
import { controllerProduto } from "../controllers/controllerProduto";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerProduto = Router();

routerProduto.get('/produto/:id', verifyAuthentication, controllerProduto.getProdutoByIdValidation, controllerProduto.getProdutoById);
routerProduto.get('/produto', verifyAuthentication, controllerProduto.getAllProdutosValidation,controllerProduto.getAllProdutos);
routerProduto.post('/produto', verifyAuthentication,controllerProduto.createProdutoValidation, controllerProduto.createProduto);
routerProduto.put('/produto/:id', verifyAuthentication, controllerProduto.updateProdutoValidation, controllerProduto.updateProdutoById);
routerProduto.delete('/produto/:id', verifyAuthentication, controllerProduto.deleteProdutoValidation, controllerProduto.deleteProduto);

export {routerProduto}