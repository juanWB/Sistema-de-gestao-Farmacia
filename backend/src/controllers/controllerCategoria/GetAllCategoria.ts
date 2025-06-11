import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoriaProvider } from "../../database/providers/categoriaProviders";

export const GetAllCategorias = async (req: Request, res: Response) => {
  const result = await CategoriaProvider.GetCategoriaProvider();

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
