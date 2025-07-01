import { Router } from "express";
import { controllerEntradaEstoque } from "../controllers/controllerEntradaEstoque";
const routerEntrada = Router();

//Rotas Entrada Estoque
routerEntrada.get('/entrada', controllerEntradaEstoque.getAllEntradasValidation,controllerEntradaEstoque.getAllEntradas);
routerEntrada.post('/entrada',controllerEntradaEstoque.createEntradaValidation, controllerEntradaEstoque.createEntradaEstoque);

export {routerEntrada}