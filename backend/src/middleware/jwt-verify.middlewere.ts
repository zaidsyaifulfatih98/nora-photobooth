import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { AppError } from '../utils/app-error.utils';
import { JWT_TOKEN_SECRET_KEY } from '../configs/dotenv.config';

export interface AuthPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export function jwtVerify(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw AppError('Unauthorized, please login', 401);
    }

    const decoded = verifyToken(token, JWT_TOKEN_SECRET_KEY as string) as AuthPayload;
    req.user = decoded;

    next();
  } catch (error) {
    next(AppError('Unauthorized, please login', 401));
  }
}
