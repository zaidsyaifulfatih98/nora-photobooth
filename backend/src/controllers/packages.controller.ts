import { NextFunction, Request, Response } from 'express';
import {
  createPackageService,
  deletePackageService,
  getPackagesService,
  updatePackageService,
} from '../services/packages.service';

export async function getPackagesController(req: Request, res: Response, next: NextFunction) {
  try {
    const packages = await getPackagesService(req.query.all === 'true');
    res.status(200).json({ success: true, message: 'Packages fetched', data: packages });
  } catch (error) {
    next(error);
  }
}

export async function createPackageController(req: Request, res: Response, next: NextFunction) {
  try {
    const pkg = await createPackageService(req.body);
    res.status(201).json({ success: true, message: 'Package created', data: pkg });
  } catch (error) {
    next(error);
  }
}

export async function updatePackageController(req: Request, res: Response, next: NextFunction) {
  try {
    const pkg = await updatePackageService(req.params.id as string, req.body);
    res.status(200).json({ success: true, message: 'Package updated', data: pkg });
  } catch (error) {
    next(error);
  }
}

export async function deletePackageController(req: Request, res: Response, next: NextFunction) {
  try {
    await deletePackageService(req.params.id as string);
    res.status(200).json({ success: true, message: 'Package deleted', data: {} });
  } catch (error) {
    next(error);
  }
}
