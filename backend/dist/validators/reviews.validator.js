"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsValidator = void 0;
const express_validator_1 = require("express-validator");
exports.reviewsValidator = [
    (0, express_validator_1.body)('name').exists().withMessage('Name is required').isString(),
    (0, express_validator_1.body)('eventLabel').exists().withMessage('Event label is required').isString(),
    (0, express_validator_1.body)('quote').exists().withMessage('Quote is required').isString(),
    (0, express_validator_1.body)('rating').optional().isInt({ min: 1, max: 5 }),
    (0, express_validator_1.body)('isPublished').optional().isBoolean(),
    (0, express_validator_1.body)('order').optional().isInt(),
];
