import { FaCameraRetro, FaBolt, FaPalette, FaMagic } from 'react-icons/fa';

const FEATURES = [
  {
    icon: FaCameraRetro,
    title: 'Kualitas Foto Premium',
    desc: 'Kamera DSLR & lighting studio profesional untuk hasil foto tajam dan flawless di setiap jepretan.',
  },
  {
    icon: FaBolt,
    title: 'Cetak Instan',
    desc: 'Foto langsung tercetak kurang dari 10 detik, jadi tamu bisa langsung bawa pulang kenangan hari itu juga.',
  },
  {
    icon: FaPalette,
    title: 'Backdrop & Frame Custom',
    desc: 'Desain backdrop, template cetak, dan frame disesuaikan dengan tema dan warna pernikahanmu.',
  },
  {
    icon: FaMagic,
    title: 'Props & Filter Seru',
    desc: 'Koleksi props unik dan pilihan filter kekinian bikin sesi foto makin hidup dan tak terlupakan.',
  },
];

export default function Features() {
  return (
    <section id='keunggulan' className='relative py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-semibold tracking-[0.2em] text-[#C9A86A] uppercase'>
            Kenapa Nora Photobooth
          </span>
          <h2 className='mt-3 font-serif text-3xl font-bold text-[#3A2E27] sm:text-4xl'>
            Keunggulan yang Membuat Momenmu Lebih Berkesan
          </h2>
          <p className='mt-4 text-[#6B5A4C]'>
            Kami memadukan teknologi, kreativitas, dan sentuhan personal agar
            setiap tamu punya cerita untuk dibawa pulang.
          </p>
        </div>

        <div className='mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className='group rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#E7D9C9]/70 transition hover:-translate-y-1 hover:shadow-xl'
            >
              <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F1E4D6] to-[#E7C9A9] transition group-hover:from-[#C9A86A] group-hover:to-[#8F6F3E]'>
                <feature.icon className='text-2xl text-[#8F6F3E] transition group-hover:text-white' />
              </div>
              <h3 className='mt-5 font-serif text-lg font-bold text-[#3A2E27]'>
                {feature.title}
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-[#6B5A4C]'>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
