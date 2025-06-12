import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SaidaProvider } from "../../database/providers/saidaEstoqueProviders";


export const GetAllSaidas = async(req: Request, res: Response) => {
    
    const result = await SaidaProvider.GetSaidaProvider();

     if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return
    }

    res.status(StatusCodes.OK).json(result)
    return;
}