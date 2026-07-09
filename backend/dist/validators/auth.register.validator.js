"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegisterValidator = void 0;
const express_validator_1 = require("express-validator");
exports.authRegisterValidator = [
    (0, express_validator_1.body)('firstName')
        .exists()
        .withMessage('Firstname is required')
        .isString()
        .isLength({
        min: 5,
        max: 25,
    })
        .withMessage('Firstname have minimum 5 characters and maximum 25 characters'),
    (0, express_validator_1.body)('lastName')
        .exists()
        .withMessage('Lastname is required')
        .isString()
        .isLength({
        min: 5,
        max: 25,
    })
        .withMessage('Lastname have minimum 5 characters and maximum 25 characters'),
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
    (0, express_validator_1.body)('role')
        .exists()
        .withMessage('Role is required')
        .isIn(['SUPER_ADMIN', 'ADMIN'])
        .withMessage('Role must be SUPER_ADMIN or ADMIN')
];
