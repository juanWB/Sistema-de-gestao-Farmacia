import { Router } from "express";
import { controllerEntradaEstoque } from "../controllers/controllerEntradaEstoque";
const router = Router();

//Rotas Entrada Estoque
router.post('/',controllerEntradaEstoque.createEntradaValidation, controllerEntradaEstoque.CreateEntradaEstoque);
router.get('/', controllerEntradaEstoque.GetAllEntradas);

export {router}