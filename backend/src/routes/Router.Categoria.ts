import { Router } from "express";
import { controllerCategoria } from "../controllers/controllerCategoria";
const routerCategoria = Router();

//Rotas Categoria
routerCategoria.post('/categorias',controllerCategoria.createCategoraValidation, controllerCategoria.CreateCategoria);
routerCategoria.get('/categorias', controllerCategoria.getAllCategoriasValidation ,controllerCategoria.GetAllCategorias);
routerCategoria.put('/categorias/:id', controllerCategoria.updateCategoriaValidation, controllerCategoria.UpdateCategoria);
routerCategoria.delete('/categorias/:id', controllerCategoria.deleteCategoriaValidation, controllerCategoria.DeleteCategoria);

export {routerCategoria}