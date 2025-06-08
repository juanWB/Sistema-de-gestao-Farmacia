import z from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IFuncionario } from "../../database/models/index";

interface IBodyProps extends Omit<IFuncionario, 'id'>{};

export const createFuncionarioValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    z.object({
      nome: z
        .string({
          required_error: "Campo obrigatório",
          invalid_type_error: "Somente letras",
        })
        .nonempty("Campo obrigatório")
        .min(3, "O nome precisa ter 3 no mínimo caracteres")
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
        .regex(/[\W_]/, "A senha deve conter pelo menos um caractere especial"),
    })
  ),
}));

export const CreateNewFuncionario = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  console.log(req.body);

  res.status(StatusCodes.CREATED).json();
  return;
};
