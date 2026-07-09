'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiDollarSign,
  FiTrendingDown,
  FiPackage,
  FiImage,
  FiStar,
} from 'react-icons/fi';
import { getFinanceSummary, FinanceSummary } from '@/features/finance/api';
import { getPackages } from '@/features/packages/api';
import { getGalleryPhotos } from '@/features/gallery/api';
import { getReviews } from '@/features/reviews/api';

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [counts, setCounts] = useState({ packages: 0, photos: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getFinanceSummary(),
      getPackages(true),
      getGalleryPhotos(true),
      getReviews(true),
    ])
      .then(([financeSummary, packages, photos, reviews]) => {
        setSummary(financeSummary);
        setCounts({
          packages: packages.length,
          photos: photos.length,
          reviews: reviews.length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='rounded-2xl border-gray-100 bg-white p-5 shadow-md'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-green-100'>
            <FiDollarSign className='text-lg text-green-600' />
          </div>
          <p className='mt-2 text-sm text-gray-500'>Total Pemasukan</p>
          <p className='text-2xl font-bold text-gray-900'>
            {loading ? '...' : formatRupiah(summary?.totalIncome ?? 0)}
          </p>
        </div>

        <div className='rounded-2xl border-gray-100 bg-white p-5 shadow-md'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-red-100'>
            <FiTrendingDown className='text-lg text-red-500' />
          </div>
          <p className='mt-2 text-sm text-gray-500'>Total Pengeluaran</p>
          <p className='text-2xl font-bold text-gray-900'>
            {loading ? '...' : formatRupiah(summary?.totalExpense ?? 0)}
          </p>
        </div>

        <div className='rounded-2xl border-gray-100 bg-white p-5 shadow-md'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1E4D6]'>
            <FiDollarSign className='text-lg text-[#8F6F3E]' />
          </div>
          <p className='mt-2 text-sm text-gray-500'>Saldo</p>
          <p className='text-2xl font-bold text-gray-900'>
            {loading ? '...' : formatRupiah(summary?.balance ?? 0)}
          </p>
        </div>
      </div>

      <div className='mt-6 grid gap-6 sm:grid-cols-3'>
        <Link
          href='/dashboard/packages'
          className='flex items-center gap-4 rounded-2xl border-gray-100 bg-white p-5 shadow-md transition hover:-translate-y-0.5'
        >
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100'>
            <FiPackage className='text-lg text-blue-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Paket Aktif</p>
            <p className='text-xl font-bold text-gray-900'>
              {loading ? '...' : counts.packages}
            </p>
          </div>
        </Link>

        <Link
          href='/dashboard/gallery'
          className='flex items-center gap-4 rounded-2xl border-gray-100 bg-white p-5 shadow-md transition hover:-translate-y-0.5'
        >
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100'>
            <FiImage className='text-lg text-purple-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Foto Galeri</p>
            <p className='text-xl font-bold text-gray-900'>
              {loading ? '...' : counts.photos}
            </p>
          </div>
        </Link>

        <Link
          href='/dashboard/reviews'
          className='flex items-center gap-4 rounded-2xl border-gray-100 bg-white p-5 shadow-md transition hover:-translate-y-0.5'
        >
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100'>
            <FiStar className='text-lg text-amber-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Review</p>
            <p className='text-xl font-bold text-gray-900'>
              {loading ? '...' : counts.reviews}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
