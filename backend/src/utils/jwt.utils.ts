import jwt, { SignOptions } from "jsonwebtoken";


export function  createToken(
    payload : any,
    secretkey: string,
    options: SignOptions
){
    return jwt.sign(payload,secretkey, options)
}

export function verifyToken(
    token: string,
    secretkey: string
){
    return jwt.verify(token,secretkey)
}