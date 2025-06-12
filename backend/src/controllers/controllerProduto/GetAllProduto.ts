import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProdutoProvider } from "../../database/providers/produtoProviders";



interface IQueryProps{
    page?: number,
    limit?: number,
    filter?: string,
}

export const getAllProdutosValidation = validation((getSchema) => ({
     query: getSchema<IQueryProps>(z.object({
        page: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
        limit: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
        filter: z.string().optional()
    }))
}))

export const GetAllProdutos = async(req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await ProdutoProvider.GetProdutoProvider();

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