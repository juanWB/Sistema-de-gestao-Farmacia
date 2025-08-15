import { Router } from "express";
import { controllerSaidaEstoque } from "../controllers/controllerSaidaEstoque";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerSaida = Router();

routerSaida.get('/saidas', verifyAuthentication, controllerSaidaEstoque.getAllSaidasValidation,controllerSaidaEstoque.getAllSaidas);
routerSaida.post('/saidas',verifyAuthentication, controllerSaidaEstoque.createSaidaValidation, controllerSaidaEstoque.createSaidaEstoque);

export {routerSaida}