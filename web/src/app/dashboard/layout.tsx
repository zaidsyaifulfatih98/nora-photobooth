'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideBar from './../components/SideBar';
import DashboardHeader from './../components/DashboardHeader';
import { useAuthStore } from '@/stores/useAuthStore';
import { getCurrentUser } from '@/features/auth/api';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setAuth, isChecked, setChecked } = useAuthStore();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getCurrentUser()
      .then((user) => {
        if (cancelled) return;
        setAuth(user);
        setIsAuthorized(true);
      })
      .catch(() => {
        if (cancelled) return;
        router.replace('/');
      })
      .finally(() => {
        if (cancelled) return;
        setChecked(true);
      });

    return () => {
      cancelled = true;
    };
  }, [setAuth, setChecked, router]);

  if (!isChecked || !isAuthorized) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-50'>
        <p className='text-sm text-gray-500'>Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3'>
        <SideBar />
      </div>
      <div className='col-span-9'>
        <DashboardHeader />

        <div className='p-10'>{children}</div>
      </div>
    </div>
  );
}
