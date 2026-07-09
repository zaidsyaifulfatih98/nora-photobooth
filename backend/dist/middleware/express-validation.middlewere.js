"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressValidation = expressValidation;
const express_validator_1 = require("express-validator");
const app_error_utils_1 = require("../utils/app-error.utils");
function expressValidation(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];
        return next((0, app_error_utils_1.AppError)(firstError.msg, 400));
    }
    next();
}
