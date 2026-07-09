import { NextFunction, Request, Response } from 'express';
import {
  createReviewService,
  deleteReviewService,
  getReviewsService,
  updateReviewService,
} from '../services/reviews.service';

export async function getReviewsController(req: Request, res: Response, next: NextFunction) {
  try {
    const reviews = await getReviewsService(req.query.all === 'true');
    res.status(200).json({ success: true, message: 'Reviews fetched', data: reviews });
  } catch (error) {
    next(error);
  }
}

export async function createReviewController(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await createReviewService(req.body);
    res.status(201).json({ success: true, message: 'Review created', data: review });
  } catch (error) {
    next(error);
  }
}

export async function updateReviewController(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await updateReviewService(req.params.id as string, req.body);
    res.status(200).json({ success: true, message: 'Review updated', data: review });
  } catch (error) {
    next(error);
  }
}

export async function deleteReviewController(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteReviewService(req.params.id as string);
    res.status(200).json({ success: true, message: 'Review deleted', data: {} });
  } catch (error) {
    next(error);
  }
}
