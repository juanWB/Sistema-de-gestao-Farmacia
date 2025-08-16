import { Router } from "express";
import { controllerEntradaEstoque } from "../controllers/controllerEntradaEstoque";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerEntrada = Router();

routerEntrada.post('/entradas', verifyAuthentication,controllerEntradaEstoque.createEntradaValidation, controllerEntradaEstoque.createEntradaEstoque);
routerEntrada.get('/entradas', verifyAuthentication, controllerEntradaEstoque.getAllEntradasValidation,controllerEntradaEstoque.getAllEntradas);
routerEntrada.get('/entradas/:id', verifyAuthentication, controllerEntradaEstoque.getEntradaEstoqueByIdValidation,controllerEntradaEstoque.getEntradaEstoqueById);
routerEntrada.put('/entradas/:id', verifyAuthentication, controllerEntradaEstoque.updateEntradaEstoqueValidation,controllerEntradaEstoque.updateEntradaEstoque);
routerEntrada.delete('/entradas/:id', verifyAuthentication, controllerEntradaEstoque.deleteEntradaEstoqueValidation,controllerEntradaEstoque.deleteEntradaEstoque);

export {routerEntrada}