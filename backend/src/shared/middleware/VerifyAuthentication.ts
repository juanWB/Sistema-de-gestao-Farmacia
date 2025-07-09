import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../service/JWTService";

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

    const jwtData = JWTService.verify(token);

    if(jwtData === "JWT_SECRET NOT FOUND"){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{default: "Erro ao verificar o token"}
        });
        return;
    }

    if(jwtData === "INVALID_TOKEN"){
        res.status(StatusCodes.UNAUTHORIZED).json({
        errors:{default: "Não autenticado"}
        });
        return;
    }

    req.headers.idUsuario = jwtData.uid.toString();
            
    return next();
}