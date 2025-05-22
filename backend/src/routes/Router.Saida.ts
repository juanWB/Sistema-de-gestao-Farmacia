import { Router } from "express";
import { controllerSaidaEstoque } from "../controllers/controllerSaidaEstoque";
const routerSaida = Router();

//Rotas Saida Estoque
routerSaida.post('/saida',controllerSaidaEstoque.createSaidaValidation, controllerSaidaEstoque.CreateSaidaEstoque);
routerSaida.get('/saida', controllerSaidaEstoque.GetAllSaidas);

export {routerSaida}