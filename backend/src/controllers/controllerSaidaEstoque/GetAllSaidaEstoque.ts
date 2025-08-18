import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SaidaProvider } from "../../database/providers/saidaEstoqueProviders";
import { validation } from "../../shared/middleware/Validation";
import { z } from "zod";

interface IQueryProps{
    page?: number,
    limit?: number,
    filter?: string,
    produto_id?: number
}

export const getAllSaidasValidation = validation((getSchema) => ({
     query: getSchema<IQueryProps>(z.object({
            page: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
            limit: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
            filter: z.string().optional(),
            produto_id: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional()
    }))
}))

export const getAllSaidas = async(req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    
    const result = await SaidaProvider.getSaidaProvider(req.query.page || 1, req.query.limit = 5, req.query.filter || '', req.query.produto_id || 0);
    const totalCount = await SaidaProvider.count();

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
        return
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', totalCount);

    res.status(StatusCodes.OK).json(result)
    return;
}