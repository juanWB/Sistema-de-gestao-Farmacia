import { z } from "zod";
import { validation } from "../../shared/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IFornecedor } from "../../database/models/index";
import { FornecedorProvider } from "../../database/providers/fornecedorProviders";

interface IBodyProps extends Omit<IFornecedor, 'id'>{};

export const createFornecedorValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    z.object({
      nome: z
        .string({
          required_error: "Campo obrigatório.",
          invalid_type_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório")
        .min(3, "O nome precisa ter 3 no mínimo caracteres")
        .max(100, "O nome não pode ultrapassar 100 caracteres.")
        .regex(
          /^[a-zA-ZÀ-ÿ\s]+$/,
          "Nome inválido apenas letras e espaços são permitidos"
        )
        .trim(),
      cnpj: z
        .string({
          required_error: "Campo obrigatório.",
          invalid_type_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório"),
      telefone: z
        .string({
          required_error: "Campo obrigatório.",
          invalid_type_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório"),
      endereco: z
        .string({
          required_error: "Campo obrigatório.",
          invalid_type_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório")
        .min(3, "Precisa ter ao menos 3 caracteres.")
        .regex(
          /^[a-zA-ZÀ-ÿ\s]+$/,
          "Rua inválida apenas letras e espaços são permitidos"
        )
        .trim(),
    })
  ),
}));

export const createFornecedor = async(req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await FornecedorProvider.createFornecedorProvider(req.body);

  if(result instanceof Error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    })
    return
  }
  
  res.status(StatusCodes.CREATED).json(result);
  return;
};
