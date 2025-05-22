import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";



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

export const GetAllProdutos = (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);

    res.status(StatusCodes.OK).json({
        message: 'Ainda não implementado'
    })
    return;
}