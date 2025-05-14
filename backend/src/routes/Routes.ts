import { Router } from "express";
import { createFuncionarioValidation, CreateNewFuncionario } from "../controllers/controllerFuncionario/CreateFuncionario";
import { UpdateFuncionarioById, updateFuncionarioValidation } from "../controllers/controllerFuncionario/UpdateFuncionario";
import { CreateProduto, createProdutoValidation } from "../controllers/controllerProdutos/CreateProduto";
import { DeleteProduto, deleteProdutoValidation } from "../controllers/controllerProdutos/DeleteProdutos";

const appRouter = Router();

//Rotas Funcionário
//appRouter.put('/:id', updateFuncionarioValidation, UpdateFuncionarioById);
//appRouter.post('/',createFuncionarioValidation, CreateNewFuncionario);


//Rotas Produto
appRouter.post('/',createProdutoValidation, CreateProduto);
appRouter.delete('/:id', deleteProdutoValidation, DeleteProduto);
export {appRouter}