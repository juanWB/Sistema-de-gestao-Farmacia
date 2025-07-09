import { Router } from "express";
import { controllerSaidaEstoque } from "../controllers/controllerSaidaEstoque";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerSaida = Router();

//Rotas Saida Estoque
routerSaida.get('/saida', verifyAuthentication, controllerSaidaEstoque.getAllSaidasValidation,controllerSaidaEstoque.getAllSaidas);
routerSaida.post('/saida',verifyAuthentication, controllerSaidaEstoque.createSaidaValidation, controllerSaidaEstoque.createSaidaEstoque);

export {routerSaida}