import { Request,Response, NextFunction } from "express"
import { authService } from "../services/auth.service"

export const authController = {
    async register (req:Request, res:Response, next:  NextFunction){
        try {
            const user = await authService.register(req.body);
            res.status(201).json({
                success: true,
                massage: "register successfully",
                data: user
            })

        }catch (error){
            next(error)

        }

    },
    async login (req:Request, res:Response, next: NextFunction){
        try{
            const {email, password} = req?.body

            const {firstName,lastName,token, role} = await authService?.login({email,password})
            
            res.cookie('token', token,{
                httpOnly: true,
                secure : true,
                sameSite: 'lax',
                path: '/'

            })

            res.status(200).json({
                success: true,
                message: 'user authentification successfully',
                data : {
                    firstName,
                    lastName,
                    role
                    
                }
            })

        }catch(error){
            next(error)

        }
    }

}