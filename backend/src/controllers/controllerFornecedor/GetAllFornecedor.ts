import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const GetAllFornecedor = (req: Request, res: Response) => {
    console.log(req.query);

    res.status(StatusCodes.OK).json({
        message: 'Ainda não implementado'
    })
    return;
}