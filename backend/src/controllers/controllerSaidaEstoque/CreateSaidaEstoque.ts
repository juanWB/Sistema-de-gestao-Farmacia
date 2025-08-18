import { z } from "zod";
import { validation } from "../../shared/middleware/Validation";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { SaidaProvider } from "../../database/providers/saidaEstoqueProviders";


interface IBodyProps {
    produto_id?: number;
    quantidade: number;
    saida_data?: Date | string;
}

export const createSaidaValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(z.object({
        produto_id: z.coerce.number({
            invalid_type_error: "O id precisa ser um número."
        }).positive('Deve ser maior que 0.').optional(),
        quantidade: z.coerce.number({
            invalid_type_error: "A quantidade precisa ser um número."
        }).positive('Deve ser maior que 0.'),
       saida_data: z.string().optional(),
    }))
}))

export const createSaidaEstoque = async(req: Request<{}, {}, IBodyProps>, res: Response) => {

    const result = await SaidaProvider.createSaidaProvider(req.body);

     if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return;
    }

    res.status(StatusCodes.CREATED).json(result);
    return;
}