import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const verifyAuthentication: RequestHandler = (req, res, next) =>{
    const { authorization } = req.headers;

    if(!authorization){
        res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{ default: "Não autorizado" }
        })

        return;
    }

    const [type, token] = authorization.split(" ");

    if(type !== "Bearer"){
        res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{ default: "Não autorizado" }
        })
        
        return;
    }

     if(token !== "teste-teste-teste"){
        res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{ default: "Não autorizado" }
        })
        
        return;
    }

    return next();
}