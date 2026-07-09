import axiosInstance from '@/utils/axiosInstance';

export interface ReviewItem {
  id: string;
  name: string;
  eventLabel: string;
  quote: string;
  rating: number;
  isPublished: boolean;
  order: number;
}

export interface ReviewPayload {
  name: string;
  eventLabel: string;
  quote: string;
  rating?: number;
  isPublished?: boolean;
  order?: number;
}

export async function getReviews(all = false) {
  const res = await axiosInstance.get(`/reviews${all ? '?all=true' : ''}`);
  return res.data.data as ReviewItem[];
}

export async function createReview(payload: ReviewPayload) {
  const res = await axiosInstance.post('/reviews', payload);
  return res.data.data as ReviewItem;
}

export async function updateReview(id: string, payload: Partial<ReviewPayload>) {
  const res = await axiosInstance.patch(`/reviews/${id}`, payload);
  return res.data.data as ReviewItem;
}

export async function deleteReview(id: string) {
  await axiosInstance.delete(`/reviews/${id}`);
}
