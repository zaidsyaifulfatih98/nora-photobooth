import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-[#2A211B] pt-16 pb-8 text-[#D9C3AE]'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <div className='flex items-center gap-2'>
              <span className='flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A86A] to-[#E7C9A9] text-sm font-bold text-white'>
                N
              </span>
              <span className='font-serif text-lg font-bold text-[#FBF6F1]'>
                Nora Photobooth
              </span>
            </div>
            <p className='mt-4 text-sm leading-relaxed'>
              Menemani hari bahagiamu dengan sesi foto yang elegan, seru, dan
              penuh kenangan.
            </p>
          </div>

          <div>
            <h4 className='font-serif text-base font-bold text-[#FBF6F1]'>
              Jelajahi
            </h4>
            <ul className='mt-4 space-y-2 text-sm'>
              <li><a href='#hero' className='hover:text-white'>Beranda</a></li>
              <li><a href='#keunggulan' className='hover:text-white'>Keunggulan</a></li>
              <li><a href='#paket' className='hover:text-white'>Paket</a></li>
              <li><a href='#galeri' className='hover:text-white'>Galeri</a></li>
              <li><a href='#testimoni' className='hover:text-white'>Testimoni</a></li>
            </ul>
          </div>

          <div>
            <h4 className='font-serif text-base font-bold text-[#FBF6F1]'>
              Kontak
            </h4>
            <ul className='mt-4 space-y-2 text-sm'>
              <li>WhatsApp: 0812-3456-7890</li>
              <li>Email: hello@noraphotobooth.id</li>
              <li>Jakarta &amp; sekitarnya</li>
            </ul>
          </div>

          <div>
            <h4 className='font-serif text-base font-bold text-[#FBF6F1]'>
              Ikuti Kami
            </h4>
            <div className='mt-4 flex gap-3'>
              <a
                href='#'
                aria-label='WhatsApp'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#C9A86A] hover:text-white'
              >
                <FaWhatsapp />
              </a>
              <a
                href='#'
                aria-label='Instagram'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#C9A86A] hover:text-white'
              >
                <FaInstagram />
              </a>
              <a
                href='#'
                aria-label='TikTok'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#C9A86A] hover:text-white'
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12 border-t border-white/10 pt-6 text-center text-xs'>
          © {new Date().getFullYear()} Nora Photobooth. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
