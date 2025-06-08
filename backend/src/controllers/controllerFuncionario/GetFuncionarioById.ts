import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


interface IParamsProps{
    id: number;
}

export const getFuncionarioByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(z.object({
        id: z.coerce.number({
            invalid_type_error: "O id precisa ser um número."
        }).positive('Deve ser maior que 0.').int('Deve ser um inteiro')
    }))
}));


export const GetFuncionarioById = async(req: Request<IParamsProps>, res: Response) => {
    console.log(req.params);

    res.status(StatusCodes.OK).json({
        message: 'Ainda não implementado'
    })

    return
}