import { body } from "express-validator";

export const authRegisterValidator = [
    body('firstName')
    .exists()
    .withMessage('Firstname is required')
    .isString()
    .isLength({
        min: 5,
        max: 25,
    })
    .withMessage('Firstname have minimum 5 characters and maximum 25 characters'),

    body('lastName')
    .exists()
    .withMessage('Lastname is required')
    .isString()
    .isLength({
        min: 5,
        max: 25,
    })
    .withMessage('Lastname have minimum 5 characters and maximum 25 characters'),

    body('email')
    .exists()
    .withMessage('Email is required')
    .isString()
    .isEmail()
    .withMessage('Firstname have minimum 5 characters and maximum 25 characters'),

    body('password')
    .exists()
    .withMessage('password is required')
    .isString(),

    body('role')
    .exists()
    .withMessage('Role is required')
    .isString()
]