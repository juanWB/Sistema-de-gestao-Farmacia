import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const GetAllCategorias = (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: 'Ainda não implementado'
    })
    return;
}