import { Router } from "express";
import { controllerCategoria } from "../controllers/controllerCategoria";
const routerCategoria = Router();

//Rotas Categoria
routerCategoria.get('/categorias', controllerCategoria.getAllCategoriasValidation ,controllerCategoria.getAllCategorias);

export {routerCategoria}