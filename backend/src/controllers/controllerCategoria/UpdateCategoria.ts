import { z } from "zod"
import { validation } from "../../service/middleware/Validation"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ICategoria } from "../../database/models/index"
import { CategoriaProvider } from "../../database/providers/categoriaProviders"



interface IParamProps {
    id?: number
}

interface IBodyProps extends Omit<ICategoria, 'id'>{}

export const updateCategoriaValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(z.object({
        id: z.coerce.number({
            required_error: "O id precisa ser um número.",
            invalid_type_error: "O id precisa ser um número."
        }).positive('Deve ser maior que 0.').int('Deve ser um inteiro')
    })),
    body: getSchema<IBodyProps>(z.object({
        nome: z.string({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).nonempty("Campo obrigatório")
        .min(3, "O nome precisa ter 3 no mínimo caracteres")
        .max(100, "O nome não pode ultrapassar 100 caracteres.")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome inválido apenas letras e espaços são permitidos")
        .trim()
    }))
}))

export const UpdateCategoria = async(req: Request<IParamProps, {}, IBodyProps>, res: Response) => {  
    const { id }  = req.params
    const categoria = req.body

    const result = await CategoriaProvider.UpdateCategoriaProvider(id!, categoria); 

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
        return
    }

    res.status(StatusCodes.NO_CONTENT).json(result);
    return;
}