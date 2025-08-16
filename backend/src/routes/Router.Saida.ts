import { Router } from "express";
import { controllerSaidaEstoque } from "../controllers/controllerSaidaEstoque";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerSaida = Router();

routerSaida.get('/saidas', verifyAuthentication, controllerSaidaEstoque.getAllSaidasValidation,controllerSaidaEstoque.getAllSaidas);
routerSaida.post('/saidas',verifyAuthentication, controllerSaidaEstoque.createSaidaValidation, controllerSaidaEstoque.createSaidaEstoque);
routerSaida.get('/entradas/:id', verifyAuthentication, controllerSaidaEstoque.getSaidaEstoqueByIdValidation,controllerSaidaEstoque.getSaidaEstoqueById);
routerSaida.put('/entradas/:id', verifyAuthentication, controllerSaidaEstoque.updateSaidaEstoqueValidation,controllerSaidaEstoque.updateSaidaEstoque);
routerSaida.delete('/entradas/:id', verifyAuthentication, controllerSaidaEstoque.deleteSaidaEstoqueValidation,controllerSaidaEstoque.deleteSaidaEstoque);

export {routerSaida}