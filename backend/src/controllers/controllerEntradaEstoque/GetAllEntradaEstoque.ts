import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const GetAllEntradas = (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: 'Entradas'
    })
    return;
}