import { PrismaClient, Role, User } from "@prisma/client"
import bcrypt from 'bcrypt'
import { AppError } from "../utils/app-error.utils";
import { createToken } from "../utils/jwt.utils";
import transporter from "../configs/nodemailer.config";
import fs from 'fs'
import path from 'path'
import Handlebars from "handlebars";
import { JWT_TOKEN_SECRET_KEY } from "../configs/dotenv.config";
import { mailService } from "./mail.service";
const prisma = new PrismaClient()

const saltRound = 10;
export const authService = {
    async register({
        firstName,
        lastName,
        email,
        password,
        role
    }: Pick<User, 'firstName' | 'lastName' | 'email' | 'password' | 'role'>): Promise<void> {
        const findUserByEmail = await prisma.user.findFirst({
            where: { email }
        });
        if(findUserByEmail) throw AppError("Email is already Registered", 422);

        const hashedPassword = await bcrypt.hash(password, saltRound)


        
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password :hashedPassword,
                role,
            }
        })

        await mailService?.sendMail(
            'reset-password.html',
            {firstName,lastName},
            email,
            'Welcome New Employee'
        )

        

        
    },
    async login({email, password}: Pick<User,'email' |'password'>){
        const findUserByEmail = await prisma.user.findFirst({
            where:{
                email
            }
        });

        if (!findUserByEmail) throw AppError('invalid credential account', 401)

        const isPasswordMatched = await bcrypt.compare(password, findUserByEmail?.password)
        
        if(!isPasswordMatched) throw AppError(' Invalid Credential account', 401)

        const token = createToken({userId: findUserByEmail?.id, role: findUserByEmail.role},
            JWT_TOKEN_SECRET_KEY!,
            {expiresIn: '1d'}
        )

       

        return {
            firstName: findUserByEmail.firstName,
            lastName: findUserByEmail.lastName,
            token,
            role: findUserByEmail?.role
        }
    }
}