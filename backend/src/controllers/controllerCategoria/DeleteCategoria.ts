import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoriaProvider } from "../../database/providers/categoriaProviders";

interface IParamProps {
  id?: number;
}

export const deleteCategoriaValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    z.object({
      id: z.coerce
        .number({
          invalid_type_error: "O id precisa ser um número.",
        })
        .positive("Deve ser maior que 0.")
        .int("Deve ser um inteiro."),
    })
  ),
}));

export const DeleteCategoria = async (req: Request<IParamProps>, res: Response) => {
  const {id} = req.params

  const result = await CategoriaProvider.DeleteCategoriaProvider(id!);

  if(result instanceof Error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    })
  }

  res.status(StatusCodes.NO_CONTENT).json(result);
  return;
};
