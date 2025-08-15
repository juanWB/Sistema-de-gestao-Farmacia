import { Router } from "express";
import { controllerCategoria } from "../controllers/controllerCategoria";
import { verifyAuthentication } from "../shared/middleware/VerifyAuthentication";
const routerCategoria = Router();

routerCategoria.get('/categorias', verifyAuthentication, controllerCategoria.getAllCategoriasValidation ,controllerCategoria.getAllCategorias);

export {routerCategoria}