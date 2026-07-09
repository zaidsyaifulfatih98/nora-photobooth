import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.utils';

export function roleVerify(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(AppError('Forbidden, insufficient role', 403));
    }
    next();
  };
}
