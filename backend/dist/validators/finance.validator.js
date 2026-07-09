"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.financeValidator = void 0;
const express_validator_1 = require("express-validator");
exports.financeValidator = [
    (0, express_validator_1.body)('type')
        .exists()
        .withMessage('Type is required')
        .isIn(['INCOME', 'EXPENSE'])
        .withMessage('Type must be INCOME or EXPENSE'),
    (0, express_validator_1.body)('category').exists().withMessage('Category is required').isString(),
    (0, express_validator_1.body)('amount')
        .exists()
        .withMessage('Amount is required')
        .isFloat({ min: 0 })
        .withMessage('Amount must be a positive number'),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('date')
        .exists()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be a valid date'),
];
