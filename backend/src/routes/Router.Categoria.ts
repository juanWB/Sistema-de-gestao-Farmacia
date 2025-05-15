import { Router } from "express";
import { controllerCategoria } from "../controllers/controllerCategoria";
const router = Router();

//Rotas Categoria
router.post('/',controllerCategoria.createCategoraValidation, controllerCategoria.CreateCategoria);
router.get('/', controllerCategoria.GetAllCategorias);
router.put('/:id', controllerCategoria.updateCategoriaValidation, controllerCategoria.UpdateCategoria);
router.delete('/:id', controllerCategoria.deleteCategoriaValidation, controllerCategoria.DeleteCategoria);

export {router}