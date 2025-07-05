import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoriaProvider } from "../../database/providers/categoriaProviders";
import { validation } from "../../shared/service/middleware/Validation";
import { z } from "zod";

interface IQueryProps{
    filter?: string,
    id?: number
}

  export const getAllCategoriasValidation = validation((getSchema) => ({
      query: getSchema<IQueryProps>(z.object({
          filter: z.string().optional(),
          id: z.coerce.number().positive('Deve ser maior que zero').int('Deve ser um inteiro').optional()
      }))
  }))



export const getAllCategorias = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await CategoriaProvider.getCategoriaProvider(req.query.filter || '');

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

    return;
  }

  res.status(StatusCodes.OK).json(result);
  return;
};
