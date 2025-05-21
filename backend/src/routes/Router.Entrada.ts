import { Router } from "express";
import { controllerEntradaEstoque } from "../controllers/controllerEntradaEstoque";
const routerEntrada = Router();

//Rotas Entrada Estoque
routerEntrada.post('/entrada',controllerEntradaEstoque.createEntradaValidation, controllerEntradaEstoque.CreateEntradaEstoque);
routerEntrada.get('/entrada', controllerEntradaEstoque.GetAllEntradas);

export {routerEntrada}