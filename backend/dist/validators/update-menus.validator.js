"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenusValidator = void 0;
const express_validator_1 = require("express-validator");
const app_error_utils_1 = require("../utils/app-error.utils");
exports.updateMenusValidator = [
    (0, express_validator_1.body)('name')
        .exists()
        .withMessage('name is required')
        .isString()
        .escape()
        .trim(),
    (0, express_validator_1.body)('price')
        .exists()
        .withMessage('price is required')
        .isString()
        .escape()
        .trim(),
    (0, express_validator_1.body)('categoryId')
        .exists()
        .withMessage('Category is required')
        .isString()
        .escape()
        .trim(),
    (0, express_validator_1.body)().custom((_, { req }) => {
        let files = [];
        if (Array.isArray(req.files)) {
            files = req.files;
        }
        else if (req.files) {
            files =
                req.files.menuImages || [];
        }
        if (!files.length) {
            throw (0, app_error_utils_1.AppError)('At least one file must be uploaded', 422);
        }
        const LIMITFILESIZE = 1024 * 1024 * 2;
        files === null || files === void 0 ? void 0 : files.forEach((file) => {
            if ((file === null || file === void 0 ? void 0 : file.size) > LIMITFILESIZE) {
                throw (0, app_error_utils_1.AppError)(`Maximum file size is ${LIMITFILESIZE}`, 422);
            }
        });
        return true;
    })
];
