import { Router } from "express";
import { router as routerCategoria } from "./Router.Categoria";
import { router as routerProduto } from "./Router.Produto";
import { router as routerEntrada } from "./Router.Entrada";
import { router as routerSaida } from "./Router.Saida";
import { router as routerFornecedor } from "./Router.Fornecedor";
import { router as routerFuncionario } from "./Router.Funcionario";

const appRouter = Router();

appRouter.use(routerCategoria);
appRouter.use(routerProduto);
appRouter.use(routerEntrada);
appRouter.use(routerSaida);
appRouter.use(routerFornecedor);
appRouter.use(routerFuncionario);

export {appRouter}