import { body } from 'express-validator';

export const packagesValidator = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .isLength({ max: 50 })
    .withMessage('Name must be at most 50 characters'),

  body('price')
    .exists()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('duration')
    .exists()
    .withMessage('Duration is required')
    .isString(),

  body('description')
    .exists()
    .withMessage('Description is required')
    .isString(),

  body('features')
    .isArray()
    .withMessage('Features must be an array of strings'),

  body('isPopular').optional().isBoolean(),
  body('isActive').optional().isBoolean(),
  body('order').optional().isInt(),
];
