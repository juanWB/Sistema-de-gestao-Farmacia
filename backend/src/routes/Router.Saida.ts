import { Router } from "express";
import { controllerSaidaEstoque } from "../controllers/controllerSaidaEstoque";
const routerSaida = Router();

//Rotas Saida Estoque
routerSaida.get('/saida', controllerSaidaEstoque.getAllSaidasValidation,controllerSaidaEstoque.GetAllSaidas);
routerSaida.post('/saida',controllerSaidaEstoque.createSaidaValidation, controllerSaidaEstoque.CreateSaidaEstoque);

export {routerSaida}