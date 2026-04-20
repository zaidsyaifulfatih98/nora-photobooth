import { Response,Request,NextFunction } from "express";
import { AppError } from "../utils/app-error.utils";

export function roleVerify(allowedRoles: String[]){
    return(req:Request, res:Response, next: NextFunction)=>{
        const {role} = res.locals.payload; 

        if(!allowedRoles?.includes(role))
            throw AppError('unauthorize access for this user role', 401)
    
        next()
    }

}