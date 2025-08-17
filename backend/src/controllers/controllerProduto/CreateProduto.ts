import { z } from "zod";
import { validation } from "../../shared/middleware/Validation";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { IProduto } from "../../database/models";
import { ProdutoProvider } from "../../database/providers/produtoProviders";
import dayjs from "dayjs";

interface IBodyProps extends Omit<IProduto, 'id'>{};

export const createProdutoValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(z.object({
        nome: z.string({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).nonempty("Campo obrigatório")
        .min(3, "O nome precisa ter 3 no mínimo caracteres")
        .max(100, "O nome não pode ultrapassar 100 caracteres.")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Apenas letras e espaços são permitidos")
        .trim(),
        preco: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório',
        }).positive('O preço precisar ser maior do que 0.'),
        validade:z.coerce.string(),
        quantidade: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).nonnegative('O campo quantidade não pode ser menor que 0').int('O campo quantidade precisar ser um inteiro.'),
        categoria_id: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).positive('O id precisar ser maior do que 0.').int('O id precisar ser um inteiro.'),
        fornecedor_id: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).positive('O id precisar ser maior do que 0.').int('O id precisar ser um inteiro.')
    }))
}))

export const createProduto = async(req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    const formatedData = dayjs(req.body.validade).startOf('day').toDate();

    const result = await ProdutoProvider.createProdutoProvider({...req.body, validade: formatedData});

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return
    }

    res.status(StatusCodes.CREATED).json(result);
    return
}