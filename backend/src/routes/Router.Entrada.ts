import { Router } from "express";
import { controllerEntradaEstoque } from "../controllers/controllerEntradaEstoque";
const router = Router();

//Rotas Entrada Estoque
router.post('/entrada',controllerEntradaEstoque.createEntradaValidation, controllerEntradaEstoque.CreateEntradaEstoque);
router.get('/entrada', controllerEntradaEstoque.GetAllEntradas);

export {router}