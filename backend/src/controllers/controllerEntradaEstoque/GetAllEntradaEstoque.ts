import { Request, Response } from "express";
import z from 'zod'
import { StatusCodes } from "http-status-codes";
import { EntradaEstoqueProvider } from "../../database/providers/entradaEstoqueProviders";
import { validation } from "../../shared/middleware/Validation";

interface IQueryProps{
    page?: number,
    limit?: number,
    filter?: string,
    produto_id?: number
}

export const getAllEntradasValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(z.object({
        page: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
        limit: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
        filter: z.string().optional(),
        produto_id: z.coerce.number().int('Deve ser um inteiro').positive('Deve ser maior que zero').optional()
    }))
}))

export const getAllEntradas = async(req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await EntradaEstoqueProvider.getEntradaProvider(req.query.page || 1, req.query.limit = 5, req.query.filter || '', req.query.produto_id || 0);
    const totalCount = await EntradaEstoqueProvider.count();
    

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

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', totalCount);

    res.status(StatusCodes.OK).json(result)
    return;
}