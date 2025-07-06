import { Router } from "express";
import { controllerCategoria } from "../controllers/controllerCategoria";
import { verifyAuthentication } from "../shared/service/middleware/VerifyAuthentication";
const routerCategoria = Router();

//Rotas Categoria
routerCategoria.get('/categorias', verifyAuthentication, controllerCategoria.getAllCategoriasValidation ,controllerCategoria.getAllCategorias);

export {routerCategoria}