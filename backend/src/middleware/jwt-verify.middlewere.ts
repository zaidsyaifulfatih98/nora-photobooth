import { Request,Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.utils";
import { verifyToken } from "../utils/jwt.utils";

export function jwtVerify(secretkey: string){
    return(req: Request, res:Response, next:NextFunction)=>{
    const {token} = req?.cookies;

    if (!token) throw AppError('token must be provided', 401)

    const payload = verifyToken(token, secretkey)
    res.locals.payload = payload;


    next()
    }
}

