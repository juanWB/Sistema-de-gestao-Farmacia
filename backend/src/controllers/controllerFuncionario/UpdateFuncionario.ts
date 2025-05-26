import { z } from "zod"
import { validation } from "../../service/middleware/Validation"
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


interface IParamProps{
    id?: number
}

interface IBodyProps{
    nome: string,
    email: string,
    senha: string
}

export const updateFuncionarioValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(z.object({
        id: z.coerce.number({
            required_error: ('Campo obrigatório.'),
            invalid_type_error: ('Deve ser um número')
        }).positive('Deve ser maior que 0.').int('Deve ser um número inteiro.')
    })),
    body: getSchema<IBodyProps>(z.object({
        nome: z.string({
                  required_error: "Campo obrigatório",
                  invalid_type_error: "Somente letras",
                })
                .nonempty("Campo obrigatório")
                .min(3, "O nome precisa ter no mínimo 3 caracteres")
                .max(100, "O nome não pode ultrapassar 100 caracteres.")
                .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Apenas letras e espaços são permitidos")
                .trim(),
        email: z
                .string({
                  required_error: "Campo obrigatório",
                })
                .email("Informe um e-mail válido.")
                .nonempty("Campo obrigatório")
                .min(13, "O email precisa ter no mínimo 13 caracteres")
                .max(100, "O campo não pode ultrapassar 100 caracteres.")
                .trim(),
        senha: z
                .string({
                  required_error: "Campo obrigatório",
                })
                .nonempty("Campo obrigatório")
                .min(8, "A senha precisa ter no mínimo 8 caracteres")
                .max(100, "O campo não pode ultrapassar 100 caracteres.")
                .trim()
                .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
                .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
                .regex(/[0-9]/, "A senha deve conter pelo menos um número")
                .regex(/[\W_]/, "A senha deve conter pelo menos um caractere especial")
    }))
}));

export const UpdateFuncionarioById = async(req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    res.status(StatusCodes.NO_CONTENT).json()
    return;
}