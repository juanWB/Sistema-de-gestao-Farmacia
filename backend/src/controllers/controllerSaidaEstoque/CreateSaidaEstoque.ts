import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { SaidaProvider } from "../../database/providers/saidaEstoqueProviders";


interface IBodyProps {
    produto_id?: number;
    quantidade: number;
    saida_data: Date | string;
}

export const createSaidaValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(z.object({
        produto_id: z.coerce.number({
            invalid_type_error: "O id precisa ser um número."
        }).positive('Deve ser maior que 0.').optional(),
        quantidade: z.coerce.number({
            invalid_type_error: "A quantidade precisa ser um número."
        }).positive('Deve ser maior que 0.'),
       saida_data: z.string({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        })
        .nonempty('Campo obrigatório')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'O formato deve ser YYYY-MM-DD')
        .transform((str) => new Date(str))
        .refine((date) => !isNaN(date.getTime()), { message: 'Data inválida' }),
    }))
}))

export const CreateSaidaEstoque = async(req: Request<{}, {}, IBodyProps>, res: Response) => {
    const saidaEstoque = req.body;

    const result = await SaidaProvider.CreateSaidaProvider(saidaEstoque)

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