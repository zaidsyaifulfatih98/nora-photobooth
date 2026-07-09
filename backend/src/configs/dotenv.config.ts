import dotenv from 'dotenv';

dotenv.config();


export const JWT_TOKEN_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY_LOGIN

export const CORS_WHITELIST = [
    process.env.WHITELIST01, 
    process.env.WHITELIST02,
    undefined
]

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const REDIS_HOST = process.env.REDIS_HOST
export const REDIS_PORT = process.env.REDIS_PORT 
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD
export const REDIS_DB = process.env.REDIS_DB 