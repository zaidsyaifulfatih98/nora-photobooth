import { HiOutlineSparkles } from 'react-icons/hi';
import { FaCamera, FaHeart, FaStar } from 'react-icons/fa';

const STATS = [
  { value: '500+', label: 'Pasangan Bahagia' },
  { value: '4.9/5', label: 'Rating Pelanggan' },
  { value: '150+', label: 'Tema Backdrop' },
];

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32'
    >
      {/* Decorative blobs */}
      <div className='pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#F3D9C0]/60 blur-3xl' />
      <div className='pointer-events-none absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-[#EAD6E0]/60 blur-3xl' />

      <div className='mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10'>
        {/* Left copy */}
        <div className='relative z-10'>
          <span className='inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B4894F] shadow-sm ring-1 ring-[#E7D9C9]'>
            <HiOutlineSparkles className='text-base' />
            Photobooth Pernikahan Premium
          </span>

          <h1 className='mt-6 font-serif text-4xl leading-tight font-bold text-[#3A2E27] sm:text-5xl lg:text-6xl'>
            Abadikan Setiap Tawa di{' '}
            <span className='text-[#C9A86A]'>Hari Bahagiamu</span>
          </h1>

          <p className='mt-6 max-w-lg text-base leading-relaxed text-[#6B5A4C] sm:text-lg'>
            Nora Photobooth menghadirkan pengalaman jepret foto yang elegan,
            seru, dan penuh kenangan untuk resepsi pernikahanmu — lengkap
            dengan cetak instan, backdrop custom, dan tim yang siap
            memanjakan tamu undanganmu.
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <a
              href='#booking'
              className='rounded-full bg-[#3A2E27] px-8 py-3.5 text-sm font-semibold text-[#FBF6F1] shadow-lg shadow-[#3A2E27]/25 transition hover:-translate-y-0.5 hover:bg-[#C9A86A]'
            >
              Booking Tanggal Sekarang
            </a>
            <a
              href='#paket'
              className='rounded-full border border-[#3A2E27]/20 bg-white/60 px-8 py-3.5 text-sm font-semibold text-[#3A2E27] transition hover:-translate-y-0.5 hover:bg-white'
            >
              Lihat Paket Harga
            </a>
          </div>

          <div className='mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[#E7D9C9] pt-8'>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className='font-serif text-2xl font-bold text-[#3A2E27] sm:text-3xl'>
                  {stat.value}
                </p>
                <p className='mt-1 text-xs text-[#8A7A6C] sm:text-sm'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual — polaroid stack */}
        <div className='relative z-10 flex justify-center lg:justify-end'>
          <div className='relative h-[420px] w-[320px] sm:h-[480px] sm:w-[360px]'>
            <Polaroid
              wrapClassName='absolute top-6 left-0 -rotate-6'
              photoClassName='bg-gradient-to-br from-[#F3D9C0] to-[#E7B98F]'
              icon={<FaHeart className='text-4xl text-white/90' />}
              caption='Sarah & Bima'
            />
            <Polaroid
              wrapClassName='absolute top-0 right-0 rotate-3'
              photoClassName='bg-gradient-to-br from-[#E0C9DB] to-[#C79FBE]'
              icon={<FaCamera className='text-4xl text-white/90' />}
              caption='Studio Look'
            />
            <Polaroid
              wrapClassName='absolute bottom-0 left-6 rotate-2'
              photoClassName='bg-gradient-to-br from-[#C9A86A] to-[#8F6F3E]'
              icon={<FaStar className='text-4xl text-white/90' />}
              caption='Golden Moment'
            />
            <div className='absolute -bottom-6 right-2 flex items-center gap-2 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-[#E7D9C9]'>
              <div className='flex h-11 w-11 items-center justify-center rounded-full bg-[#F1E4D6]'>
                <FaCamera className='text-lg text-[#C9A86A]' />
              </div>
              <div>
                <p className='text-sm font-bold text-[#3A2E27]'>Cetak Instan</p>
                <p className='text-xs text-[#8A7A6C]'>&lt; 10 detik / foto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Polaroid({
  wrapClassName,
  photoClassName,
  icon,
  caption,
}: {
  wrapClassName: string;
  photoClassName: string;
  icon: React.ReactNode;
  caption: string;
}) {
  return (
    <div
      className={`h-56 w-48 rounded-lg bg-white p-3 shadow-2xl transition-transform hover:-translate-y-1 hover:rotate-0 sm:h-64 sm:w-56 ${wrapClassName}`}
    >
      <div
        className={`flex h-[78%] w-full items-center justify-center rounded-md ${photoClassName}`}
      >
        {icon}
      </div>
      <p className='mt-2 text-center font-serif text-sm font-semibold text-[#3A2E27]'>
        {caption}
      </p>
    </div>
  );
}
