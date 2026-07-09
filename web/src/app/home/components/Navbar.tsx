'use client';

import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Keunggulan', href: '#keunggulan' },
  { label: 'Paket', href: '#paket' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Testimoni', href: '#testimoni' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#FBF6F1]/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10'>
        <a href='#hero' className='flex items-center gap-2'>
          <span className='flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A86A] to-[#E7C9A9] text-sm font-bold text-white shadow-md'>
            N
          </span>
          <span className='font-serif text-xl font-bold tracking-wide text-[#3A2E27]'>
            Nora <span className='text-[#C9A86A]'>Photobooth</span>
          </span>
        </a>

        <div className='hidden items-center gap-8 lg:flex'>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-sm font-medium text-[#5C4A3D] transition hover:text-[#C9A86A]'
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href='#booking'
          className='hidden rounded-full bg-[#3A2E27] px-6 py-2.5 text-sm font-semibold text-[#FBF6F1] shadow-lg shadow-[#3A2E27]/20 transition hover:bg-[#C9A86A] lg:inline-block'
        >
          Booking Sekarang
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label='Buka menu'
          className='text-2xl text-[#3A2E27] lg:hidden'
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {open && (
        <div className='flex flex-col gap-1 border-t border-[#E7D9C9] bg-[#FBF6F1] px-6 py-4 lg:hidden'>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className='rounded-lg px-3 py-2.5 text-sm font-medium text-[#5C4A3D] hover:bg-[#F1E4D6]'
            >
              {link.label}
            </a>
          ))}
          <a
            href='#booking'
            onClick={() => setOpen(false)}
            className='mt-2 rounded-full bg-[#3A2E27] px-6 py-2.5 text-center text-sm font-semibold text-[#FBF6F1]'
          >
            Booking Sekarang
          </a>
        </div>
      )}
    </header>
  );
}
