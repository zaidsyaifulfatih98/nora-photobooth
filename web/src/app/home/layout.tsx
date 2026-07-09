import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Nora Photobooth — Abadikan Momen Bahagiamu',
  description:
    'Nora Photobooth menghadirkan pengalaman photobooth pernikahan premium dengan konsep custom, cetak instan, dan tim profesional untuk hari bahagiamu.',
};

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${playfair.variable} ${poppins.variable} font-sans bg-[#FBF6F1] text-[#3A2E27]`}
    >
      {children}
    </div>
  );
}
