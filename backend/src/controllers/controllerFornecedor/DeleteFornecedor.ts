import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


interface IParamProps {
    id?: number;
}

export const deleteFornecedorValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(z.object({
        id: z.coerce.number({
            invalid_type_error: "O id precisar ser um número."
        }).positive('Deve ser maior que 0.').int('Deve ser um inteiro')
    }))
}));

export const DeleteFornecedor = async(req: Request<IParamProps>, res: Response) => {
    console.log(req.params);

    res.status(StatusCodes.OK).json({
        message: 'Ainda não implementado'
   })

    return;
}