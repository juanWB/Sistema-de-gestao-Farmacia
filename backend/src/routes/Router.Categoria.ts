import { Router } from "express";
import { controllerCategoria } from "../controllers/controllerCategoria";
const router = Router();

//Rotas Categoria
router.post('/categorias',controllerCategoria.createCategoraValidation, controllerCategoria.CreateCategoria);
router.get('/categorias', controllerCategoria.GetAllCategorias);
router.put('/categorias/:id', controllerCategoria.updateCategoriaValidation, controllerCategoria.UpdateCategoria);
router.delete('/categorias/:id', controllerCategoria.deleteCategoriaValidation, controllerCategoria.DeleteCategoria);

export {router}