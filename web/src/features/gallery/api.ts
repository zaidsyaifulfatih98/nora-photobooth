import axiosInstance from '@/utils/axiosInstance';

export interface GalleryPhotoItem {
  id: string;
  url: string;
  caption: string | null;
  order: number;
  isActive: boolean;
}

export async function getGalleryPhotos(all = false) {
  const res = await axiosInstance.get(`/gallery${all ? '?all=true' : ''}`);
  return res.data.data as GalleryPhotoItem[];
}

export async function uploadGalleryPhoto(file: File, caption?: string) {
  const formData = new FormData();
  formData.append('image', file);
  if (caption) formData.append('caption', caption);

  const res = await axiosInstance.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data as GalleryPhotoItem;
}

export async function updateGalleryPhoto(
  id: string,
  payload: Partial<Pick<GalleryPhotoItem, 'caption' | 'order' | 'isActive'>>,
) {
  const res = await axiosInstance.patch(`/gallery/${id}`, payload);
  return res.data.data as GalleryPhotoItem;
}

export async function deleteGalleryPhoto(id: string) {
  await axiosInstance.delete(`/gallery/${id}`);
}
