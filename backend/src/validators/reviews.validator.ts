import { body } from 'express-validator';

export const reviewsValidator = [
  body('name').exists().withMessage('Name is required').isString(),
  body('eventLabel').exists().withMessage('Event label is required').isString(),
  body('quote').exists().withMessage('Quote is required').isString(),
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('isPublished').optional().isBoolean(),
  body('order').optional().isInt(),
];
