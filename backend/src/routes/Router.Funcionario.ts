import { Router } from "express";
import { controllerFuncionario } from "../controllers/controllerFuncionario";

const routerFuncionario = Router();

//Rotas Funcionario
routerFuncionario.get('/funcionario/:id', controllerFuncionario.getFuncionarioByIdValidation, controllerFuncionario.GetFuncionarioById);
routerFuncionario.post('/funcionario',controllerFuncionario.createFuncionarioValidation, controllerFuncionario.CreateNewFuncionario);
routerFuncionario.get('/funcionario', controllerFuncionario.getAllFuncionarioValidation, controllerFuncionario.GetAllFuncionario);
routerFuncionario.delete('/funcionario/:id', controllerFuncionario.deleteFuncionarioValidation, controllerFuncionario.DeleteFuncionario);
routerFuncionario.put('/funcionario/:id', controllerFuncionario.updateFuncionarioValidation, controllerFuncionario.UpdateFuncionarioById);

export {routerFuncionario}