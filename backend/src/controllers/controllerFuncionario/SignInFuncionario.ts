import z from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IFuncionario } from "../../database/models/index";
import { FuncionarioProvider } from "../../database/providers/funcionarioProviders";

interface IBodyProps extends Omit<IFuncionario, 'id' | 'nome'>{};

export const signInFuncionarioValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    z.object({
      email: z
        .string({
          required_error: "Campo obrigatório",
        })
        .email("Informe um e-mail válido.")
        .nonempty("Campo obrigatório")
        .min(10, "O email precisa ter no mínimo 13 caracteres")
        .max(100, "O campo não pode ultrapassar 100 caracteres.")
        .trim(),
      senha: z
        .string({
          required_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório")
        .min(8)
        .trim()
    })
  ),
}));

export const signInFuncionario = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const {email, senha} = req.body;
  
  const result = await FuncionarioProvider.getFuncionarioByEmailProvider(email);

  if(result instanceof Error){
      res.status(StatusCodes.UNAUTHORIZED).json({
          errors:{
              default: 'E-mail ou senha inválidos'
          }
      })
      return
  }

   if(senha !== result.senha){
      res.status(StatusCodes.UNAUTHORIZED).json({
          errors:{
              default: 'E-mail ou senha inválidos'
          }
      })
      return
  }else{
     res.status(StatusCodes.OK).json({accessToken: 'teste-teste-teste'});
     return;
  }
 
};
