import { Router } from 'express';
import {
  createPackageController,
  deletePackageController,
  getPackagesController,
  updatePackageController,
} from '../controllers/packages.controller';
import { packagesValidator } from '../validators/packages.validator';
import { expressValidation } from '../middleware/express-validation.middlewere';
import { jwtVerify } from '../middleware/jwt-verify.middlewere';
import { roleVerify } from '../middleware/role-verify.middlewere';

const packagesRouter = Router();

packagesRouter.get('/', getPackagesController);
packagesRouter.post(
  '/',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  packagesValidator,
  expressValidation,
  createPackageController,
);
packagesRouter.patch(
  '/:id',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  updatePackageController,
);
packagesRouter.delete(
  '/:id',
  jwtVerify,
  roleVerify(['SUPER_ADMIN', 'ADMIN']),
  deletePackageController,
);

export default packagesRouter;
