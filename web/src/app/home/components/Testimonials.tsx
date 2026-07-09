import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { fetchPublic } from '@/utils/serverApi';

interface ReviewData {
  id: string;
  name: string;
  eventLabel: string;
  quote: string;
  rating: number;
}

const FALLBACK_REVIEWS: ReviewData[] = [
  {
    id: 'sarah-bima',
    name: 'Sarah & Bima',
    eventLabel: 'Resepsi, Mei 2026',
    quote:
      'Tamu-tamu kami betah antre di booth-nya karena seru banget! Hasil cetakannya juga cantik, senada banget sama dekorasi kami.',
    rating: 5,
  },
  {
    id: 'dinda-raka',
    name: 'Dinda & Raka',
    eventLabel: 'Akad & Resepsi, Maret 2026',
    quote:
      'Tim Nora responsif banget dari awal konsultasi sampai hari-H. Propsnya lucu-lucu, template fotonya juga bisa custom sesuai request.',
    rating: 5,
  },
  {
    id: 'putri-aldi',
    name: 'Putri & Aldi',
    eventLabel: 'Garden Party, Januari 2026',
    quote:
      'Worth it banget buat kenang-kenangan tamu. Cetak fotonya cepat, hasilnya bagus, dan galeri online-nya memudahkan kami bagi-bagi foto.',
    rating: 5,
  },
];

const GRADIENTS = [
  'from-[#F3D9C0] to-[#E7B98F]',
  'from-[#E0C9DB] to-[#C79FBE]',
  'from-[#C9A86A] to-[#8F6F3E]',
];

function getInitials(name: string) {
  return name
    .split(/\s*&\s*|\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default async function Testimonials() {
  const reviews = (await fetchPublic<ReviewData[]>('/reviews')) ?? FALLBACK_REVIEWS;

  return (
    <section id='testimoni' className='relative py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-semibold tracking-[0.2em] text-[#C9A86A] uppercase'>
            Testimoni
          </span>
          <h2 className='mt-3 font-serif text-3xl font-bold text-[#3A2E27] sm:text-4xl'>
            Cerita dari Pasangan yang Kami Temani
          </h2>
        </div>

        <div className='mt-16 grid gap-6 lg:grid-cols-3'>
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className='flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#E7D9C9]/70'
            >
              <FaQuoteLeft className='text-2xl text-[#E7C9A9]' />
              <p className='mt-4 flex-1 text-sm leading-relaxed text-[#5C4A3D] italic'>
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className='mt-6 flex items-center gap-1 text-[#C9A86A]'>
                {Array.from({ length: review.rating }).map((_, r) => (
                  <FaStar key={r} className='text-sm' />
                ))}
              </div>

              <div className='mt-4 flex items-center gap-3 border-t border-[#F1E4D6] pt-4'>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${
                    GRADIENTS[i % GRADIENTS.length]
                  }`}
                >
                  {getInitials(review.name)}
                </div>
                <div>
                  <p className='font-serif text-sm font-bold text-[#3A2E27]'>
                    {review.name}
                  </p>
                  <p className='text-xs text-[#8A7A6C]'>{review.eventLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
