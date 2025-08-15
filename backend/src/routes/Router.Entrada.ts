import { Router } from "express";
import { controllerEntradaEstoque } from "../controllers/controllerEntradaEstoque";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerEntrada = Router();

routerEntrada.get('/entradas', verifyAuthentication, controllerEntradaEstoque.getAllEntradasValidation,controllerEntradaEstoque.getAllEntradas);
routerEntrada.get('/entradas/:id', verifyAuthentication, controllerEntradaEstoque.getAllEntradasValidation,controllerEntradaEstoque.getAllEntradas);
routerEntrada.put('/entradas/:id', verifyAuthentication, controllerEntradaEstoque.getAllEntradasValidation,controllerEntradaEstoque.getAllEntradas);
routerEntrada.delete('/entradas/:id', verifyAuthentication, controllerEntradaEstoque.getAllEntradasValidation,controllerEntradaEstoque.getAllEntradas);
routerEntrada.post('/entradas', verifyAuthentication,controllerEntradaEstoque.createEntradaValidation, controllerEntradaEstoque.createEntradaEstoque);

export {routerEntrada}