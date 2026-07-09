import { body } from 'express-validator';

export const financeValidator = [
  body('type')
    .exists()
    .withMessage('Type is required')
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('Type must be INCOME or EXPENSE'),

  body('category').exists().withMessage('Category is required').isString(),

  body('amount')
    .exists()
    .withMessage('Amount is required')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),

  body('description').optional().isString(),

  body('date')
    .exists()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid date'),
];
