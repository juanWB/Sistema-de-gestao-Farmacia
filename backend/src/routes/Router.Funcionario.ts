import { Router } from "express";
import { controllerFuncionario } from "../controllers/controllerFuncionario";

const routerFuncionario = Router();

routerFuncionario.post('/cadastrar',controllerFuncionario.signUpFuncionarioValidation, controllerFuncionario.signUpFuncionario);
routerFuncionario.post('/entrar',controllerFuncionario.signInFuncionarioValidation, controllerFuncionario.signInFuncionario);


export {routerFuncionario}