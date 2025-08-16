import { z } from "zod";
import { validation } from "../../shared/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EntradaEstoqueProvider } from "../../database/providers/entradaEstoqueProviders";


interface IParamsProps{
    id?: number;
}

export const getEntradaEstoqueByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(z.object({
        id: z.coerce.number({
            required_error: "O id é obrigatório",
            invalid_type_error: "O id precisa ser um número."
        }).positive('Deve ser maior que 0.').int('Deve ser um inteiro')
    }))
}));


export const getEntradaEstoqueById = async(req: Request<IParamsProps>, res: Response) => {
    const {id} = req.params

    if(!id){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
          default: 'O id é um parametro obrigatório.'
          }
      })
      return
    }

    const result = await EntradaEstoqueProvider.getEntradaEstoqueByIdProvider(id);

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