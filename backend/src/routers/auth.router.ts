import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { jwtVerify } from "../middleware/jwt-verify.middlewere";
import { roleVerify } from "../middleware/role-verify.middlewere";
import { JWT_TOKEN_SECRET_KEY } from "../configs/dotenv.config";
import { expressRequestValidation } from "../middleware/express-validation.middlewere";
import { authRegisterValidator } from "../validators/auth.register.validator";
import { authLoginValidator } from "../validators/auth.login.validator";

const authRouter = Router();

authRouter.post(
    '/register',
    jwtVerify(JWT_TOKEN_SECRET_KEY!),
    roleVerify(['SUPER_ADMIN']),
    authRegisterValidator,
    expressRequestValidation,
    authController.register
)
authRouter.post('/login',
    authLoginValidator,
    expressRequestValidation,
     authController?.login)

export default authRouter

