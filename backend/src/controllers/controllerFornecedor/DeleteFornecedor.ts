import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FornecedorProvider } from "../../database/providers/fornecedorProviders";


interface IParamProps {
    id?: number;
}

export const deleteFornecedorValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(z.object({
        id: z.coerce.number({
            invalid_type_error: "O id precisa ser um número"
        }).positive('Deve ser maior que 0.').int('Deve ser um inteiro')
    }))
}));

export const DeleteFornecedor = async(req: Request<IParamProps>, res: Response) => {
    const {id} = req.params
    const result = await FornecedorProvider.DeleteFornecedorProvider(id!);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return
    }

    res.status(StatusCodes.NOT_FOUND).json(result);
    return;
}