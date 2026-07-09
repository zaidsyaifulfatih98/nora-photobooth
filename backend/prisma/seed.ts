import bcrypt from 'bcrypt';
import prisma from '../src/configs/pool-connection.config';

async function main() {
  const hashedPassword = await bcrypt.hash('admin12345', 10);

  await prisma.user.upsert({
    where: { email: 'admin@noraphotobooth.id' },
    update: {},
    create: {
      firstName: 'Nora',
      lastName: 'Admin',
      email: 'admin@noraphotobooth.id',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Admin user seeded (admin@noraphotobooth.id / admin12345)');

  const packageCount = await prisma.package.count();
  if (packageCount === 0) {
    await prisma.package.createMany({
      data: [
        {
          name: 'Silver',
          price: 2500000,
          duration: '3 jam sesi',
          description:
            'Paket hemat untuk resepsi intim dengan 1 backdrop tema pilihan.',
          features: [
            '1 backdrop tema pilihan',
            'Cetak foto unlimited (4R)',
            '1 orang crew photobooth',
            'Free props standar',
            'Soft file semua foto',
          ],
          isPopular: false,
          order: 1,
        },
        {
          name: 'Gold',
          price: 4200000,
          duration: '5 jam sesi',
          description:
            'Paket paling populer dengan backdrop custom dan galeri online.',
          features: [
            'Backdrop custom sesuai tema',
            'Cetak foto unlimited (4R & strip)',
            '2 orang crew photobooth',
            'Props premium + digital filter',
            'Soft file + album digital',
            'Free galeri online 30 hari',
          ],
          isPopular: true,
          order: 2,
        },
        {
          name: 'Platinum',
          price: 6500000,
          duration: '8 jam / full event',
          description:
            'Paket lengkap untuk full event dengan fotografer tambahan.',
          features: [
            'Backdrop & frame full custom',
            'Cetak foto unlimited semua ukuran',
            '3 orang crew + 1 fotografer lepas',
            'Props premium + GIF & boomerang',
            'Album digital + cetak mini album',
            'Free galeri online 90 hari',
          ],
          isPopular: false,
          order: 3,
        },
      ],
    });
    console.log('✅ Package seeding completed');
  }

  const reviewCount = await prisma.review.count();
  if (reviewCount === 0) {
    await prisma.review.createMany({
      data: [
        {
          name: 'Sarah & Bima',
          eventLabel: 'Resepsi, Mei 2026',
          quote:
            'Tamu-tamu kami betah antre di booth-nya karena seru banget! Hasil cetakannya juga cantik, senada banget sama dekorasi kami.',
          rating: 5,
          order: 1,
        },
        {
          name: 'Dinda & Raka',
          eventLabel: 'Akad & Resepsi, Maret 2026',
          quote:
            'Tim Nora responsif banget dari awal konsultasi sampai hari-H. Propsnya lucu-lucu, template fotonya juga bisa custom sesuai request.',
          rating: 5,
          order: 2,
        },
        {
          name: 'Putri & Aldi',
          eventLabel: 'Garden Party, Januari 2026',
          quote:
            'Worth it banget buat kenang-kenangan tamu. Cetak fotonya cepat, hasilnya bagus, dan galeri online-nya memudahkan kami bagi-bagi foto.',
          rating: 5,
          order: 3,
        },
      ],
    });
    console.log('✅ Review seeding completed');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
