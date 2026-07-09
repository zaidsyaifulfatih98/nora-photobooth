import prisma from '../configs/pool-connection.config';
import { AppError } from '../utils/app-error.utils';

interface ReviewPayload {
  name: string;
  eventLabel: string;
  quote: string;
  rating?: number;
  isPublished?: boolean;
  order?: number;
}

export async function getReviewsService(includeUnpublished = false) {
  return prisma.review.findMany({
    where: { deletedAt: null, ...(includeUnpublished ? {} : { isPublished: true }) },
    orderBy: { order: 'asc' },
  });
}

export async function createReviewService(data: ReviewPayload) {
  return prisma.review.create({ data });
}

export async function updateReviewService(id: string, data: Partial<ReviewPayload>) {
  const existing = await prisma.review.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw AppError('Review not found', 404);
  }

  return prisma.review.update({ where: { id }, data });
}

export async function deleteReviewService(id: string) {
  const existing = await prisma.review.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw AppError('Review not found', 404);
  }

  return prisma.review.update({ where: { id }, data: { deletedAt: new Date() } });
}
