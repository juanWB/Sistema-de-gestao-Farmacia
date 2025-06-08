import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICategoria } from "../../database/models/index";


interface IBodyProps extends Omit<ICategoria, 'id'>{}

export const createCategoraValidation = validation((getSchema) => ({
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

export const CreateCategoria = (req: Request<{}, {}, IBodyProps>, res: Response) => {

    res.status(StatusCodes.CREATED).json();

    return
}