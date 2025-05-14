import { z } from "zod";
import { validation } from "../../service/middleware/Validation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


interface IParamsProps{
    id?: number;
}

export const deleteProdutoValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(z.object({
        id: z.coerce.number().optional()
    }))
}));


export const DeleteProduto = async(req: Request<IParamsProps>, res: Response) => {
    console.log(req.params);

    res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Ainda não implementado'
    })

    return
}