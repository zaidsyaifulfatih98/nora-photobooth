import { HiCheckCircle } from 'react-icons/hi';
import { fetchPublic } from '@/utils/serverApi';

interface PackageData {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

const FALLBACK_PACKAGES: PackageData[] = [
  {
    id: 'silver',
    name: 'Silver',
    price: '2500000',
    duration: '3 jam sesi',
    description: '',
    isPopular: false,
    features: [
      '1 backdrop tema pilihan',
      'Cetak foto unlimited (4R)',
      '1 orang crew photobooth',
      'Free props standar',
      'Soft file semua foto',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '4200000',
    duration: '5 jam sesi',
    description: '',
    isPopular: true,
    features: [
      'Backdrop custom sesuai tema',
      'Cetak foto unlimited (4R & strip)',
      '2 orang crew photobooth',
      'Props premium + digital filter',
      'Soft file + album digital',
      'Free galeri online 30 hari',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: '6500000',
    duration: '8 jam / full event',
    description: '',
    isPopular: false,
    features: [
      'Backdrop & frame full custom',
      'Cetak foto unlimited semua ukuran',
      '3 orang crew + 1 fotografer lepas',
      'Props premium + GIF & boomerang',
      'Album digital + cetak mini album',
      'Free galeri online 90 hari',
    ],
  },
];

function formatRupiah(value: string) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default async function Packages() {
  const packages =
    (await fetchPublic<PackageData[]>('/packages')) ?? FALLBACK_PACKAGES;

  return (
    <section id='paket' className='relative bg-[#FCF3E9] py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-semibold tracking-[0.2em] text-[#C9A86A] uppercase'>
            Investasi Kenangan
          </span>
          <h2 className='mt-3 font-serif text-3xl font-bold text-[#3A2E27] sm:text-4xl'>
            Pilih Paket Sesuai Kebutuhan Acaramu
          </h2>
          <p className='mt-4 text-[#6B5A4C]'>
            Semua paket bisa disesuaikan lagi — konsultasikan kebutuhanmu dan
            kami bantu racik paket yang pas.
          </p>
        </div>

        <div className='mt-16 grid gap-8 lg:grid-cols-3'>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-3xl p-8 transition hover:-translate-y-1 ${
                pkg.isPopular
                  ? 'bg-[#3A2E27] text-[#FBF6F1] shadow-2xl shadow-[#3A2E27]/30 lg:scale-105'
                  : 'bg-white text-[#3A2E27] shadow-sm ring-1 ring-[#E7D9C9]'
              }`}
            >
              {pkg.isPopular && (
                <span className='absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#C9A86A] px-4 py-1 text-xs font-bold tracking-wide text-white shadow-lg'>
                  PALING POPULER
                </span>
              )}

              <h3 className='font-serif text-2xl font-bold'>{pkg.name}</h3>
              <p
                className={`mt-1 text-sm ${
                  pkg.isPopular ? 'text-[#E7D9C9]' : 'text-[#8A7A6C]'
                }`}
              >
                {pkg.duration}
              </p>

              <p className='mt-6 font-serif text-3xl font-bold'>
                {formatRupiah(pkg.price)}
              </p>

              {pkg.description && (
                <p
                  className={`mt-2 text-sm ${
                    pkg.isPopular ? 'text-[#E7D9C9]' : 'text-[#6B5A4C]'
                  }`}
                >
                  {pkg.description}
                </p>
              )}

              <ul className='mt-8 flex-1 space-y-3'>
                {pkg.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-2.5 text-sm'>
                    <HiCheckCircle
                      className={`mt-0.5 shrink-0 text-lg ${
                        pkg.isPopular ? 'text-[#C9A86A]' : 'text-[#B4894F]'
                      }`}
                    />
                    <span
                      className={
                        pkg.isPopular ? 'text-[#F1E4D6]' : 'text-[#5C4A3D]'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href='#booking'
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                  pkg.isPopular
                    ? 'bg-[#C9A86A] text-white hover:bg-[#B4894F]'
                    : 'bg-[#F1E4D6] text-[#3A2E27] hover:bg-[#E7C9A9]'
                }`}
              >
                Pilih Paket {pkg.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
