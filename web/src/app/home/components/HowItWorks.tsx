import { HiOutlineChatAlt2, HiOutlineColorSwatch, HiOutlineCamera, HiOutlineGift } from 'react-icons/hi';

const STEPS = [
  {
    icon: HiOutlineChatAlt2,
    title: 'Konsultasi & Booking',
    desc: 'Hubungi kami via WhatsApp, ceritakan tanggal dan tema acaramu, lalu kunci jadwal dengan DP.',
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'Pilih Paket & Tema',
    desc: 'Tentukan paket, warna backdrop, dan desain template cetak yang sesuai konsep pernikahanmu.',
  },
  {
    icon: HiOutlineCamera,
    title: 'Hari-H Serunya',
    desc: 'Tim kami datang lebih awal untuk setup, lalu menemani tamu berfoto sepuasnya sepanjang acara.',
  },
  {
    icon: HiOutlineGift,
    title: 'Cetak & Kenangan',
    desc: 'Tamu bawa pulang cetakan foto instan, kamu dapat seluruh soft file dan galeri online.',
  },
];

export default function HowItWorks() {
  return (
    <section className='relative bg-[#FCF3E9] py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-semibold tracking-[0.2em] text-[#C9A86A] uppercase'>
            Cara Kerja
          </span>
          <h2 className='mt-3 font-serif text-3xl font-bold text-[#3A2E27] sm:text-4xl'>
            Booking Mudah, Hasil Berkesan
          </h2>
        </div>

        <div className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {STEPS.map((step, i) => (
            <div key={step.title} className='relative text-center'>
              <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#E7D9C9]'>
                <step.icon className='text-3xl text-[#C9A86A]' />
              </div>
              <span className='mx-auto mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#3A2E27] text-xs font-bold text-white'>
                {i + 1}
              </span>
              <h3 className='mt-3 font-serif text-lg font-bold text-[#3A2E27]'>
                {step.title}
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-[#6B5A4C]'>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
