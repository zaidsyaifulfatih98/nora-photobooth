import prisma from '../configs/pool-connection.config';
import { AppError } from '../utils/app-error.utils';

interface PackagePayload {
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isActive?: boolean;
  order?: number;
}

export async function getPackagesService(includeInactive = false) {
  return prisma.package.findMany({
    where: { deletedAt: null, ...(includeInactive ? {} : { isActive: true }) },
    orderBy: { order: 'asc' },
  });
}

export async function createPackageService(data: PackagePayload) {
  return prisma.package.create({ data });
}

export async function updatePackageService(id: string, data: Partial<PackagePayload>) {
  const existing = await prisma.package.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw AppError('Package not found', 404);
  }

  return prisma.package.update({ where: { id }, data });
}

export async function deletePackageService(id: string) {
  const existing = await prisma.package.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw AppError('Package not found', 404);
  }

  return prisma.package.update({ where: { id }, data: { deletedAt: new Date() } });
}
