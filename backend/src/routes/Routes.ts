import { Router } from "express";
import { createFuncionarioValidation, CreateNewFuncionario } from "../controllers/controllerFuncionario/CreateFuncionario";

const appRouter = Router();


appRouter.get('/', () => {
    console.log('rodando');
})

appRouter.post('/',createFuncionarioValidation, CreateNewFuncionario);

export {appRouter}