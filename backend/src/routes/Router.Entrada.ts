import { Router } from "express";
import { controllerEntradaEstoque } from "../controllers/controllerEntradaEstoque";
const routerEntrada = Router();

//Rotas Entrada Estoque
routerEntrada.get('/entrada', controllerEntradaEstoque.getAllEntradasValidation,controllerEntradaEstoque.GetAllEntradas);
routerEntrada.post('/entrada',controllerEntradaEstoque.createEntradaValidation, controllerEntradaEstoque.CreateEntradaEstoque);

export {routerEntrada}