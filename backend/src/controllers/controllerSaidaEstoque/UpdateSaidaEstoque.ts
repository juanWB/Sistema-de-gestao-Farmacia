import { z } from "zod";
import { validation } from "../../shared/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ISaidaEstoque } from "../../database/models/index";
import { SaidaProvider } from "../../database/providers/saidaEstoqueProviders";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ISaidaEstoque, 'id'>{};

export const updateSaidaEstoqueValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    z.object({
      id: z.coerce
        .number({
          invalid_type_error: "O id precisa ser um número.",
        })
        .positive("Deve ser maior que 0.")
        .int("Deve ser um inteiro"),
    })
  ),
body: getSchema<IBodyProps>(z.object({
        produto_id: z.coerce.number({
            required_error: "Campo obrigatório",
            invalid_type_error: "O id precisar ser um número."
        }).positive('Deve ser maior que 0.').int('O id deve ser um inteiro.'),
        quantidade: z.coerce.number({
            required_error: "",
            invalid_type_error: "A quantidade precisar ser um número."
        }).positive('Deve ser maior que 0.').int('A quantidade precisa ser um inteiro.'),
       saida_data: z.string({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        })
        .nonempty('Campo obrigatório').
        regex(/^\d{2}-\d{2}-\d{4}$/, 'O formato deve ser DD-MM-YYYY')
        .transform((str) => new Date(str))
        .refine((date) => !isNaN(date.getTime()), { message: 'Data inválida' })
        ,
    }))
}));

export const updateSaidaEstoque = async(req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  
  if(!req.params.id){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
          default: 'O id é um parametro obrigatório.'
      }
      })
      return
  }

  const result = await SaidaProvider.updateSaidaEstoqueProvider(req.params.id!, req.body);
  
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
};
