import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { IEntradaEstoque } from "../../database/models";
import { EntradaEstoqueProvider } from "../../database/providers/entradaEstoqueProviders";


interface IBodyProps extends Omit<IEntradaEstoque, 'id'>{}

export const createEntradaValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(z.object({
        produto_id: z.coerce.number({
            required_error: "Campo obrigatório",
            invalid_type_error: "O id precisar ser um número."
        }).positive('Deve ser maior que 0.').int('O id deve ser um inteiro.'),
        quantidade: z.coerce.number({
            required_error: "",
            invalid_type_error: "A quantidade precisar ser um número."
        }).positive('Deve ser maior que 0.').int('A quantidade precisa ser um inteiro.'),
       entrada_data: z.string({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        })
        .nonempty('Campo obrigatório').
        regex(/^\d{4}-\d{2}-\d{2}$/, 'O formato deve ser YYYY-MM-DD')
        .transform((str) => new Date(str))
        .refine((date) => !isNaN(date.getTime()), { message: 'Data inválida' })
        ,
    }))
}))

export const CreateEntradaEstoque = async(req: Request<{}, {}, IBodyProps>, res: Response) => {
    const novaCategoria = req.body
    
    const result = await EntradaEstoqueProvider.CreateEntradaProvider(novaCategoria);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
        return
    }

    res.status(StatusCodes.CREATED).json(result)
    return;
}