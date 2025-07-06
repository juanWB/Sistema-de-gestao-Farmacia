import { Router } from "express";
import { controllerEntradaEstoque } from "../controllers/controllerEntradaEstoque";
import { verifyAuthentication } from "../shared/service/middleware/VerifyAuthentication";
const routerEntrada = Router();

//Rotas Entrada Estoque
routerEntrada.get('/entrada', verifyAuthentication, controllerEntradaEstoque.getAllEntradasValidation,controllerEntradaEstoque.getAllEntradas);
routerEntrada.post('/entrada', verifyAuthentication,controllerEntradaEstoque.createEntradaValidation, controllerEntradaEstoque.createEntradaEstoque);

export {routerEntrada}