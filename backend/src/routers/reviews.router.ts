import { Router } from 'express';
import {
  createReviewController,
  deleteReviewController,
  getReviewsController,
  updateReviewController,
} from '../controllers/reviews.controller';
import { reviewsValidator } from '../validators/reviews.validator';
import { expressValidation } from '../middleware/express-validation.middlewere';
import { jwtVerify } from '../middleware/jwt-verify.middlewere';
import { roleVerify } from '../middleware/role-verify.middlewere';

const reviewsRouter = Router();

reviewsRouter.get('/', getReviewsController);
reviewsRouter.post(
  '/',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  reviewsValidator,
  expressValidation,
  createReviewController,
);
reviewsRouter.patch(
  '/:id',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  updateReviewController,
);
reviewsRouter.delete(
  '/:id',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  deleteReviewController,
);

export default reviewsRouter;
