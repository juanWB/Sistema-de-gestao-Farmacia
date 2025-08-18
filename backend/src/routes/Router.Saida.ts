import { Router } from "express";
import { controllerSaidaEstoque } from "../controllers/controllerSaidaEstoque";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerSaida = Router();

routerSaida.get('/saidas', verifyAuthentication, controllerSaidaEstoque.getAllSaidasValidation,controllerSaidaEstoque.getAllSaidas);
routerSaida.post('/saidas',verifyAuthentication, controllerSaidaEstoque.createSaidaValidation, controllerSaidaEstoque.createSaidaEstoque);
routerSaida.get('/saidas/:id', verifyAuthentication, controllerSaidaEstoque.getSaidaEstoqueByIdValidation,controllerSaidaEstoque.getSaidaEstoqueById);
routerSaida.put('/saidas/:id', verifyAuthentication, controllerSaidaEstoque.updateSaidaEstoqueValidation,controllerSaidaEstoque.updateSaidaEstoque);
routerSaida.delete('/saidas/:id', verifyAuthentication, controllerSaidaEstoque.deleteSaidaEstoqueValidation,controllerSaidaEstoque.deleteSaidaEstoque);

export {routerSaida}