import { Router } from "express";

const appRouter = Router();


appRouter.get('/', () => {
    console.log('rodando');
})


export {appRouter}