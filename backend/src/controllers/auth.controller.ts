import { NextFunction, Request, Response } from 'express';
import {
  getCurrentUserService,
  loginService,
  registerService,
} from '../services/auth.service';

const isProduction = process.env.NODE_ENV === 'production';

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginService({ email, password });

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function registerController(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      success: true,
      message: 'Register successful',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutController(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('token');
    res.status(200).json({
      success: true,
      message: 'Logout successful',
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getCurrentUserService(req.user!.id);

    res.status(200).json({
      success: true,
      message: 'Current user fetched',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
