import { z } from "zod"
import { validation } from "../../service/middleware/Validation"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"



interface IParamProps {
    id?: number
}

interface IBodyProps {
    nome: string
}

export const updateCategoriaValidation = validation((getSchema) => ({
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
        .trim()
    }))
}))

export const UpdateCategoria = (req: Request<{}, {}, IBodyProps>, res: Response) => {  
    console.log(req.body);
    console.log(req.params);

    res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Ainda não implementado'
    })
    return;
}