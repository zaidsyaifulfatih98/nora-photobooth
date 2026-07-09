import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.utils';
import {
  createGalleryPhotoService,
  deleteGalleryPhotoService,
  getGalleryService,
  updateGalleryPhotoService,
} from '../services/gallery.service';

export async function getGalleryController(req: Request, res: Response, next: NextFunction) {
  try {
    const photos = await getGalleryService(req.query.all === 'true');
    res.status(200).json({ success: true, message: 'Gallery fetched', data: photos });
  } catch (error) {
    next(error);
  }
}

export async function createGalleryPhotoController(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      throw AppError('Image file is required', 400);
    }

    const { caption, order } = req.body;
    const photo = await createGalleryPhotoService(
      req.file.buffer,
      caption,
      order ? Number(order) : undefined,
    );

    res.status(201).json({ success: true, message: 'Photo uploaded', data: photo });
  } catch (error) {
    next(error);
  }
}

export async function updateGalleryPhotoController(req: Request, res: Response, next: NextFunction) {
  try {
    const photo = await updateGalleryPhotoService(req.params.id as string, req.body);
    res.status(200).json({ success: true, message: 'Photo updated', data: photo });
  } catch (error) {
    next(error);
  }
}

export async function deleteGalleryPhotoController(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteGalleryPhotoService(req.params.id as string);
    res.status(200).json({ success: true, message: 'Photo deleted', data: {} });
  } catch (error) {
    next(error);
  }
}
