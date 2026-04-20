import { body } from "express-validator";

export const authLoginValidator = [
    

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

    
]