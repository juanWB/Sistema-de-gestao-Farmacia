import { Router } from "express";
import { controllerSaidaEstoque } from "../controllers/controllerSaidaEstoque";
const routerSaida = Router();

//Rotas Saida Estoque
routerSaida.post('/',controllerSaidaEstoque.createSaidaValidation, controllerSaidaEstoque.CreateSaidaEstoque);
routerSaida.get('/', controllerSaidaEstoque.GetAllSaidas);

export {routerSaida}