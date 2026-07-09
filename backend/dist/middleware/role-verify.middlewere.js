"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleVerify = roleVerify;
const app_error_utils_1 = require("../utils/app-error.utils");
function roleVerify(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next((0, app_error_utils_1.AppError)('Forbidden, insufficient role', 403));
        }
        next();
    };
}
