import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface IBodyProps {
  nome: string;
  cnpj: string;
  telefone: string;
  endereco: string;
}

export const createFornecedorValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
      nome: z.string({
          required_error: "Campo obrigatório.",
          invalid_type_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório")
        .min(3, "O nome precisa ter 3 no mínimo caracteres")
        .max(100, "O nome não pode ultrapassar 100 caracteres.")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Apenas letras e espaços são permitidos")
        .trim(),
      cnpj: z.string({
          required_error: "Campo obrigatório.",
          invalid_type_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório")
        .transform(val => val.replace(/\D/g, ''))
        .refine(val => val.length === 14, {
            message: "CNPJ precisa ter exatamente 14 dígitos"
        }),
     telefone: z.string({
         required_error: "Campo obrigatório.",
          invalid_type_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório")
        .regex(/^[\s\d()\-./]{10,15}$/, 'O telefone precisa ter entre 10 e 15 caracteres válidos')
        .transform(val => val.replace(/[^\d]/g, ''))
        .refine(val => val.length >= 10 && val.length <= 15, {
            message: "telefone precisa ter enter 10 e 14 dígitos"
        }),
    endereco: z.string({
         required_error: "Campo obrigatório.",
          invalid_type_error: "Campo obrigatório",
    })
      .nonempty("Campo obrigatório")
      .min(3, 'Precisa ter ao menos 3 caracteres.')
    })),
}));

export const CreateFornecedor = (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body);

    res.status(StatusCodes.CREATED).json({
        message: 'Ainda não implementado'
    })

    return;
}