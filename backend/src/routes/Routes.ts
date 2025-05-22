import { Router } from "express";
import { routerCategoria } from "./Router.Categoria";
import { routerProduto } from "./Router.Produto";
import { routerEntrada } from "./Router.Entrada";
import { routerSaida } from "./Router.Saida";
import { routerFornecedor } from "./Router.Fornecedor";
import { routerFuncionario } from "./Router.Funcionario";


const appRouter = Router();

appRouter.use(routerFornecedor);
appRouter.use(routerEntrada);
appRouter.use(routerCategoria);
appRouter.use(routerProduto);
appRouter.use(routerSaida);
appRouter.use(routerFuncionario);


export {appRouter}