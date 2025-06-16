import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../service/middleware/Validation";
import { z } from "zod";
import { FuncionarioProvider } from "../../database/providers/funcionarioProviders";

interface IQueryProps{
    page?: number,
    limit?: number,
    filter?: string,
    id?: number
}

export const getAllFuncionarioValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(z.object({
        page: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
        limit: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional(),
        filter: z.string().optional(),
        id: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional()
    }))
}))

export const GetAllFuncionario = async(req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await FuncionarioProvider.GetFuncionarioProvider(req.query.page || 1, req.query.limit = 10, req.query.filter || '', req.query.id || 0);
    const count = await FuncionarioProvider.Count();
    


    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return
    }

    if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    });

    return;
    }

    res.status(StatusCodes.OK).json(result)
    return;
}