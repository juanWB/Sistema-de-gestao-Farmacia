import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const GetAllEntradas = (req: Request, res: Response) => {
    console.log(req.query);

    res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Ainda não implementado'
    })
    return;
}