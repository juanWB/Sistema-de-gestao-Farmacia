import { Router } from "express";
import { controllerFuncionario } from "../controllers/controllerFuncionario";
const routerFuncionario = Router();

//Rotas Produto
routerFuncionario.post('/',controllerFuncionario.createFuncionarioValidation, controllerFuncionario.CreateNewFuncionario);
routerFuncionario.put('/:id', controllerFuncionario.updateFuncionarioValidation, controllerFuncionario.UpdateFuncionarioById);

export {routerFuncionario}