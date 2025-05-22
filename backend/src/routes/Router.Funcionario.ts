import { Router } from "express";
import { controllerFuncionario } from "../controllers/controllerFuncionario";
const routerFuncionario = Router();

//Rotas Funcionario
routerFuncionario.post('/funcionario',controllerFuncionario.createFuncionarioValidation, controllerFuncionario.CreateNewFuncionario);
routerFuncionario.put('/funcionario/:id', controllerFuncionario.updateFuncionarioValidation, controllerFuncionario.UpdateFuncionarioById);

export {routerFuncionario}