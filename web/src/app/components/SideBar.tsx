'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { logout } from '@/features/auth/api';
import {
  FiHome,
  FiDollarSign,
  FiPackage,
  FiImage,
  FiStar,
  FiLogOut,
} from 'react-icons/fi';

const menuMain = [
  { label: 'Ringkasan', href: '/dashboard', icon: FiHome },
  { label: 'Keuangan', href: '/dashboard/finance', icon: FiDollarSign },
  { label: 'Paket & Harga', href: '/dashboard/packages', icon: FiPackage },
  { label: 'Galeri', href: '/dashboard/gallery', icon: FiImage },
  { label: 'Review', href: '/dashboard/reviews', icon: FiStar },
];

export default function SideBar() {
  const { user, clearAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuth();
      router.push('/');
    }
  };

  return (
    <aside className='flex h-screen flex-col border-r border-gray-100 bg-white'>
      {/* Logo */}
      <div className='flex items-center gap-3 px-6 py-5'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9A86A] to-[#E7C9A9] text-white font-bold'>
          N
        </div>
        <span className='text-lg font-semibold text-gray-800'>
          Nora Photobooth
        </span>
      </div>

      {/* Menu */}
      <nav className='flex-1 px-4'>
        <p className='mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400'>
          Menu
        </p>

        <ul className='space-y-1'>
          {menuMain.map((item) => {
            const active =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname?.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                    ${
                      active
                        ? 'bg-[#F1E4D6] text-[#8F6F3E]'
                        : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className='text-lg' />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className='border-t border-gray-100 px-4 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#F1E4D6] text-sm font-bold text-[#8F6F3E]'>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <div className='flex-1'>
            <p className='text-sm font-semibold text-gray-800'>
              {user?.firstName} {user?.lastName}
            </p>
            <p className='text-xs text-gray-500'>{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            aria-label='Logout'
            className='text-gray-400 hover:text-red-500'
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </aside>
  );
}
