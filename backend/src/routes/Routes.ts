import { Router } from "express";
import { createFuncionarioValidation, CreateNewFuncionario } from "../controllers/controllerFuncionario/CreateFuncionario";
import { UpdateFuncionarioById, updateFuncionarioValidation } from "../controllers/controllerFuncionario/UpdateFuncionario";
import { CreateProduto, createProdutoValidation } from "../controllers/controllerProdutos/CreateProduto";
import { DeleteProduto, deleteProdutoValidation } from "../controllers/controllerProdutos/DeleteProdutos";
import { GetProdutoById, getProdutoByIdValidation } from "../controllers/controllerProdutos/GetById";
import { GetAllProdutos, getAllProdutosValidation } from "../controllers/controllerProdutos/GetAllProdutos";
import { UpdateProdutoById, updateProdutoValidation } from "../controllers/controllerProdutos/UpdateProduto";
import { createCategoraValidation, CreateCategoria } from "../controllers/controllerCategoria/CreateCategoria";
import { GetAllCategorias } from "../controllers/controllerCategoria/GetAllCategoria";
import { DeleteCategoria, deleteCategoriaValidation } from "../controllers/controllerCategoria/DeleteCategoria";

const appRouter = Router();

//Rotas Funcionário
//appRouter.put('/:id', updateFuncionarioValidation, UpdateFuncionarioById);
//appRouter.post('/',createFuncionarioValidation, CreateNewFuncionario);


//Rotas Produto
//appRouter.post('/',createProdutoValidation, CreateProduto);
//appRouter.get('/', getAllProdutosValidation, GetAllProdutos);
//appRouter.get('/:id', getProdutoByIdValidation, GetProdutoById);
//appRouter.put('/:id', updateProdutoValidation, UpdateProdutoById);
//appRouter.delete('/:id', deleteProdutoValidation, DeleteProduto);


//Rotas Categoria
//appRouter.post('/', createCategoraValidation, CreateCategoria);
//appRouter.get('/', GetAllCategorias);
//appRouter.delete('/:id', deleteCategoriaValidation, DeleteCategoria);

//Rotas fornecedor

export {appRouter}