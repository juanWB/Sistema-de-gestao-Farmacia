import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

interface IParamProps{
    id?: number;
}

interface IBodyProps{
    nome: string;
    preco: number;
    validade: Date | string;
    quantidade: number;
    categoria_id: number;
    fornecedor_id: number;
}

export const updateProdutoValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(z.object({
        id: z.coerce.number({
            invalid_type_error: "O id precisar ser um número."
        }).positive('Deve ser maior que 0.').optional()
    })),
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
        validade:z.string({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        })
        .nonempty('Campo obrigatório')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'O formato deve ser YYYY-MM-DD')
        .transform((str) => new Date(str))
        .refine((date) => !isNaN(date.getTime()), { message: 'Data inválida' }),
        quantidade: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).nonnegative('O campo quantidade não pode ser menor que 0').int('O campo quantidade precisar ser um inteiro.'),
        categoria_id: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).positive('O id precisar ser maior do que 0.'),
        fornecedor_id: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).positive('O id precisar ser maior do que 0.')
    }))
}))

export const UpdateProdutoById = async(req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    console.log(req.body);
    console.log(req.params);

    res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Ainda não implementado'
    });
}