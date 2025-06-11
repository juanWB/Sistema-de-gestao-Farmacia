import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EntradaEstoqueProvider } from "../../database/providers/entradaEstoqueProviders";


export const GetAllEntradas = async(req: Request, res: Response) => {
    const result = await EntradaEstoqueProvider.GetEntradaProvider();

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return
    }

    res.status(StatusCodes.OK).json({result})
    return;
}