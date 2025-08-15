import { z } from "zod";
import { validation } from "../../shared/middleware/Validation";
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

export const deleteFornecedor = async(req: Request<IParamProps>, res: Response) => {
    const {id} = req.params

    if(!id){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
            default: 'O id é um parametro obrigatório.'
        }
        })
        return
    }

    const result = await FornecedorProvider.deleteFornecedorProvider(id);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return
    }

    res.status(StatusCodes.NO_CONTENT).json(result);
    return;
}