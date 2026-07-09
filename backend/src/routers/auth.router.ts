import { Router } from 'express';
import {
  getCurrentUserController,
  loginController,
  logoutController,
  registerController,
} from '../controllers/auth.controller';
import { authLoginValidator } from '../validators/auth.login.validator';
import { authRegisterValidator } from '../validators/auth.register.validator';
import { expressValidation } from '../middleware/express-validation.middlewere';
import { jwtVerify } from '../middleware/jwt-verify.middlewere';
import { roleVerify } from '../middleware/role-verify.middlewere';

const authRouter = Router();

authRouter.post('/login', authLoginValidator, expressValidation, loginController);
authRouter.post('/logout', logoutController);
authRouter.get('/me', jwtVerify, getCurrentUserController);
authRouter.post(
  '/register',
  jwtVerify,
  roleVerify(['SUPER_ADMIN']),
  authRegisterValidator,
  expressValidation,
  registerController,
);

export default authRouter;
