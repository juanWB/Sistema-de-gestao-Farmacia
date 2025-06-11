import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FornecedorProvider } from "../../database/providers/fornecedorProviders";


export const GetAllFornecedor = async(req: Request, res: Response) => {
    const result = await FornecedorProvider.GetFornecedorProvider();

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