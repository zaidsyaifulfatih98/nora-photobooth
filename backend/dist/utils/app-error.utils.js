"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = AppError;
function AppError(message, statusCode = 500) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.expose = true;
    return error;
}
