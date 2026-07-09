"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.authLoginValidator = [
    (0, express_validator_1.body)('email')
        .exists()
        .withMessage('Email is required')
        .isString()
        .isEmail()
        .withMessage('Email must be a valid email address'),
    (0, express_validator_1.body)('password')
        .exists()
        .withMessage('password is required')
        .isString(),
];
