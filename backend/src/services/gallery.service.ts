import prisma from '../configs/pool-connection.config';
import { AppError } from '../utils/app-error.utils';
import { cloudinaryUpload } from '../utils/cloudinary.utils';

export async function getGalleryService(includeInactive = false) {
  return prisma.galleryPhoto.findMany({
    where: { deletedAt: null, ...(includeInactive ? {} : { isActive: true }) },
    orderBy: { order: 'asc' },
  });
}

export async function createGalleryPhotoService(file: Buffer, caption?: string, order?: number) {
  const { secureUrl } = await cloudinaryUpload(file);

  return prisma.galleryPhoto.create({
    data: {
      url: secureUrl,
      caption,
      order: order ?? 0,
    },
  });
}

export async function updateGalleryPhotoService(
  id: string,
  data: { caption?: string; order?: number; isActive?: boolean },
) {
  const existing = await prisma.galleryPhoto.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw AppError('Photo not found', 404);
  }

  return prisma.galleryPhoto.update({ where: { id }, data });
}

export async function deleteGalleryPhotoService(id: string) {
  const existing = await prisma.galleryPhoto.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw AppError('Photo not found', 404);
  }

  return prisma.galleryPhoto.update({ where: { id }, data: { deletedAt: new Date() } });
}
