import { RequestHandler } from "express";
import { ZodError, ZodType } from "zod";
import { StatusCodes } from "http-status-codes"



type TProperty = 'body' | 'query' | 'params' | 'header';

type TGetSchema = <T>(schema: ZodType<T>) => ZodType<T>;

type TAllSchemas = Record<TProperty, ZodType<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async(req, res, next) => {
   const schemas = getAllSchemas((schema) => schema); 

   const errorsResult: Record<string, Record<string, string>> = {};

   Object.entries(schemas).forEach(([key, schema]) => {
    try{
        schema.parse(req[key as TProperty]);
        return;
    }catch(err){
        const zodError = err as ZodError;
        let errors: Record<string, string> = {};

        zodError.errors.forEach(error => {
            if(!error.path)return
            const field = error.path[0] as string;
            errors[field] = error.message;
        })

        errorsResult[key] = errors;
    }
   });

    if(Object.entries(errorsResult).length === 0){
        return next();
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsResult
        })
        return;
    }
}   