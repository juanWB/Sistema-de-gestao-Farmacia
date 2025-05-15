import { Router } from "express";
import { controllerSaidaEstoque } from "../controllers/controllerSaidaEstoque";
const router = Router();

//Rotas Saida Estoque
router.post('/',controllerSaidaEstoque.createSaidaValidation, controllerSaidaEstoque.CreateSaidaEstoque);
router.get('/', controllerSaidaEstoque.GetAllSaidas);

export {router}