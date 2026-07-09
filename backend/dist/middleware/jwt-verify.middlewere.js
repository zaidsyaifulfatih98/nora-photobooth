"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = jwtVerify;
const jwt_utils_1 = require("../utils/jwt.utils");
const app_error_utils_1 = require("../utils/app-error.utils");
const dotenv_config_1 = require("../configs/dotenv.config");
function jwtVerify(req, res, next) {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            throw (0, app_error_utils_1.AppError)('Unauthorized, please login', 401);
        }
        const decoded = (0, jwt_utils_1.verifyToken)(token, dotenv_config_1.JWT_TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        next((0, app_error_utils_1.AppError)('Unauthorized, please login', 401));
    }
}
