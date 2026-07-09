import { FaHeart } from 'react-icons/fa';
import { fetchPublic } from '@/utils/serverApi';

interface GalleryPhotoData {
  id: string;
  url: string;
  caption: string | null;
}

const PLACEHOLDER_TILES = [
  { gradient: 'from-[#F3D9C0] to-[#E7B98F]', span: 'row-span-2' },
  { gradient: 'from-[#E0C9DB] to-[#C79FBE]', span: '' },
  { gradient: 'from-[#C9A86A] to-[#8F6F3E]', span: '' },
  { gradient: 'from-[#D9C3AE] to-[#B99B76]', span: 'row-span-2' },
  { gradient: 'from-[#E7C9A9] to-[#D1A374]', span: '' },
  { gradient: 'from-[#CBB6C9] to-[#9E7C9B]', span: '' },
  { gradient: 'from-[#EAD6E0] to-[#D4A9BF]', span: '' },
  { gradient: 'from-[#F1E4D6] to-[#DCB98A]', span: '' },
];

export default async function Gallery() {
  const photos = await fetchPublic<GalleryPhotoData[]>('/gallery');
  const hasPhotos = photos && photos.length > 0;

  return (
    <section id='galeri' className='relative py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-semibold tracking-[0.2em] text-[#C9A86A] uppercase'>
            Galeri Momen
          </span>
          <h2 className='mt-3 font-serif text-3xl font-bold text-[#3A2E27] sm:text-4xl'>
            Sekilas Keseruan di Setiap Bidikan
          </h2>
          <p className='mt-4 text-[#6B5A4C]'>
            Cuplikan suasana photobooth dari berbagai resepsi yang pernah kami
            temani.
          </p>
        </div>

        <div className='mt-16 grid auto-rows-[140px] grid-cols-2 gap-4 sm:grid-cols-3 sm:auto-rows-[180px] lg:grid-cols-4'>
          {hasPhotos
            ? photos!.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-[#E7D9C9]/70 ${
                    i % 5 === 0 ? 'row-span-2' : ''
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.caption ?? 'Momen Nora Photobooth'}
                    className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                  />
                </div>
              ))
            : PLACEHOLDER_TILES.map((tile, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-sm ring-1 ring-[#E7D9C9]/70 ${tile.gradient} ${tile.span}`}
                >
                  <div className='absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition group-hover:opacity-100'>
                    <FaHeart className='text-3xl text-white drop-shadow' />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
