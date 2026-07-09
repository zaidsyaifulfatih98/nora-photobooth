import { body } from "express-validator";

export const authLoginValidator = [
    body('email')
    .exists()
    .withMessage('Email is required')
    .isString()
    .isEmail()
    .withMessage('Email must be a valid email address'),

    body('password')
    .exists()
    .withMessage('password is required')
    .isString(),
]