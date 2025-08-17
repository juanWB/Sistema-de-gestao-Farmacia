import { z } from "zod";
import { validation } from "../../shared/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProdutoProvider } from "../../database/providers/produtoProviders";



interface IQueryProps{
    page?: number,
    limit?: number,
    filter?: string,
    id?: number
}

export const getAllProdutosValidation = validation((getSchema) => ({
     query: getSchema<IQueryProps>(z.object({
            page: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
            limit: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
            filter: z.string().optional(),
            id: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional()
    }))
}))

export const getAllProdutos = async(req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await ProdutoProvider.getProdutoProvider(req.query.page || 1, req.query.limit = 5, req.query.filter || '', Number(req.query.id) || 0);
    const totalCount = await ProdutoProvider.count();
    

     if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return
    }

    if (totalCount instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: totalCount.message,
      },
    });

    return;
    }

    res.setHeader('access-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', totalCount)

    res.status(StatusCodes.OK).json(result);
    return;
}