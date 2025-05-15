import { Router } from "express";
import { controllerFuncionario } from "../controllers/controllerFuncionario";
const router = Router();

//Rotas Produto
router.post('/',controllerFuncionario.createFuncionarioValidation, controllerFuncionario.CreateNewFuncionario);
router.put('/:id', controllerFuncionario.updateFuncionarioValidation, controllerFuncionario.UpdateFuncionarioById);

export {router}