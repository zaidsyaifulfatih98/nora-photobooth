'use client';

import { usePathname } from 'next/navigation';
import { FiBell } from 'react-icons/fi';

const TITLES: Record<string, string> = {
  '/dashboard': 'Ringkasan',
  '/dashboard/finance': 'Keuangan',
  '/dashboard/packages': 'Paket & Harga',
  '/dashboard/gallery': 'Galeri',
  '/dashboard/reviews': 'Review',
};

export default function DashboardHeader() {
  const pathname = usePathname();
  const title = TITLES[pathname ?? ''] ?? 'Dashboard';

  return (
    <header className='flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6'>
      <h1 className='text-lg font-semibold text-gray-800'>{title}</h1>

      <div className='flex items-center gap-4'>
        <button className='relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
          <FiBell className='text-xl' />
        </button>
      </div>
    </header>
  );
}
