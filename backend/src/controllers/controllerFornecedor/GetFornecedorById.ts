import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FornecedorProvider } from "../../database/providers/fornecedorProviders";


interface IParamsProps{
    id?: number;
}

export const getFornecedorByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(z.object({
        id: z.coerce.number({
            invalid_type_error: "O id precisa ser um número."
        }).positive('Deve ser maior que 0.').int('Deve ser um inteiro')
    }))
}));


export const getFornecedorById = async(req: Request<IParamsProps>, res: Response) => {
    const {id} = req.params

    if(!id){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
          default: 'O id é um parametro obrigatório.'
          }
      })
      return
    }

    const result = await FornecedorProvider.getFornecedorByIdProvider(id);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
        return
    }

    res.status(StatusCodes.OK).json(result);
    return
}