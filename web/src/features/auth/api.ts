import axiosInstance from '@/utils/axiosInstance';

export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export async function getCurrentUser() {
  const res = await axiosInstance.get('/auth/me');
  return res.data.data as CurrentUser;
}

export async function logout() {
  await axiosInstance.post('/auth/logout');
}
