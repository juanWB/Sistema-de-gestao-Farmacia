import { Router } from "express";
import { controllerFuncionario } from "../controllers/controllerFuncionario";

const routerFuncionario = Router();

//Rotas Funcionario
routerFuncionario.post('/funcionario',controllerFuncionario.createFuncionarioValidation, controllerFuncionario.CreateNewFuncionario);
routerFuncionario.get('/funcionario/:id', controllerFuncionario.GetFuncionarioById);
routerFuncionario.put('/funcionario/:id', controllerFuncionario.updateFuncionarioValidation, controllerFuncionario.UpdateFuncionarioById);

export {routerFuncionario}