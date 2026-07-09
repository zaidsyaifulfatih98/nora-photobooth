import axiosInstance from '@/utils/axiosInstance';

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  order: number;
}

export interface PackagePayload {
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isActive?: boolean;
  order?: number;
}

export async function getPackages(all = false) {
  const res = await axiosInstance.get(`/packages${all ? '?all=true' : ''}`);
  return res.data.data as PackageItem[];
}

export async function createPackage(payload: PackagePayload) {
  const res = await axiosInstance.post('/packages', payload);
  return res.data.data as PackageItem;
}

export async function updatePackage(id: string, payload: Partial<PackagePayload>) {
  const res = await axiosInstance.patch(`/packages/${id}`, payload);
  return res.data.data as PackageItem;
}

export async function deletePackage(id: string) {
  await axiosInstance.delete(`/packages/${id}`);
}
