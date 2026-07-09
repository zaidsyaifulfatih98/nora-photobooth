"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = loginController;
exports.registerController = registerController;
exports.logoutController = logoutController;
exports.getCurrentUserController = getCurrentUserController;
const auth_service_1 = require("../services/auth.service");
const isProduction = process.env.NODE_ENV === 'production';
function loginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const { token, user } = yield (0, auth_service_1.loginService)({ email, password });
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
        }
        catch (error) {
            next(error);
        }
    });
}
function registerController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, auth_service_1.registerService)(req.body);
            res.status(201).json({
                success: true,
                message: 'Register successful',
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function logoutController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie('token');
            res.status(200).json({
                success: true,
                message: 'Logout successful',
                data: {},
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getCurrentUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, auth_service_1.getCurrentUserService)(req.user.id);
            res.status(200).json({
                success: true,
                message: 'Current user fetched',
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
