import { Router } from 'express';
import {
  createGalleryPhotoController,
  deleteGalleryPhotoController,
  getGalleryController,
  updateGalleryPhotoController,
} from '../controllers/gallery.controller';
import { jwtVerify } from '../middleware/jwt-verify.middlewere';
import { roleVerify } from '../middleware/role-verify.middlewere';
import { uploader } from '../middleware/uploader.middlewere';

const galleryRouter = Router();

galleryRouter.get('/', getGalleryController);
galleryRouter.post(
  '/',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  uploader.single('image'),
  createGalleryPhotoController,
);
galleryRouter.patch(
  '/:id',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  updateGalleryPhotoController,
);
galleryRouter.delete(
  '/:id',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  deleteGalleryPhotoController,
);

export default galleryRouter;
