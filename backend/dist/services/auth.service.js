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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = loginService;
exports.registerService = registerService;
exports.getCurrentUserService = getCurrentUserService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const pool_connection_config_1 = __importDefault(require("../configs/pool-connection.config"));
const app_error_utils_1 = require("../utils/app-error.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const dotenv_config_1 = require("../configs/dotenv.config");
function loginService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password }) {
        const user = yield pool_connection_config_1.default.user.findFirst({
            where: { email, deletedAt: null },
        });
        if (!user) {
            throw (0, app_error_utils_1.AppError)('Email or password is incorrect', 401);
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw (0, app_error_utils_1.AppError)('Email or password is incorrect', 401);
        }
        const token = (0, jwt_utils_1.createToken)({ id: user.id, role: user.role }, dotenv_config_1.JWT_TOKEN_SECRET_KEY, { expiresIn: '1d' });
        return {
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        };
    });
}
function registerService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield pool_connection_config_1.default.user.findFirst({
            where: { email: data.email, deletedAt: null },
        });
        if (existingUser) {
            throw (0, app_error_utils_1.AppError)('Email is already registered', 400);
        }
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        const user = yield pool_connection_config_1.default.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                role: data.role,
            },
        });
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };
    });
}
function getCurrentUserService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield pool_connection_config_1.default.user.findFirst({
            where: { id, deletedAt: null },
        });
        if (!user) {
            throw (0, app_error_utils_1.AppError)('User not found', 404);
        }
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };
    });
}
