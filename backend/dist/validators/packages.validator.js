"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packagesValidator = void 0;
const express_validator_1 = require("express-validator");
exports.packagesValidator = [
    (0, express_validator_1.body)('name')
        .exists()
        .withMessage('Name is required')
        .isString()
        .isLength({ max: 50 })
        .withMessage('Name must be at most 50 characters'),
    (0, express_validator_1.body)('price')
        .exists()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('duration')
        .exists()
        .withMessage('Duration is required')
        .isString(),
    (0, express_validator_1.body)('description')
        .exists()
        .withMessage('Description is required')
        .isString(),
    (0, express_validator_1.body)('features')
        .isArray()
        .withMessage('Features must be an array of strings'),
    (0, express_validator_1.body)('isPopular').optional().isBoolean(),
    (0, express_validator_1.body)('isActive').optional().isBoolean(),
    (0, express_validator_1.body)('order').optional().isInt(),
];
