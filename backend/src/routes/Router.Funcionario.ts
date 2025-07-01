import { Router } from "express";
import { controllerFuncionario } from "../controllers/controllerFuncionario";

const routerFuncionario = Router();

//Rotas Funcionario
routerFuncionario.get('/funcionario/:id', controllerFuncionario.getFuncionarioByIdValidation, controllerFuncionario.getFuncionarioById);
routerFuncionario.post('/funcionario',controllerFuncionario.createFuncionarioValidation, controllerFuncionario.createNewFuncionario);
routerFuncionario.get('/funcionario', controllerFuncionario.getAllFuncionarioValidation, controllerFuncionario.getAllFuncionario);
routerFuncionario.delete('/funcionario/:id', controllerFuncionario.deleteFuncionarioValidation, controllerFuncionario.deleteFuncionario);
routerFuncionario.put('/funcionario/:id', controllerFuncionario.updateFuncionarioValidation, controllerFuncionario.updateFuncionarioById);

export {routerFuncionario}