'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '6281234567890';
const PACKAGE_OPTIONS = ['Silver', 'Gold', 'Platinum', 'Belum yakin / konsultasi dulu'];

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    eventDate: '',
    package: PACKAGE_OPTIONS[1],
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `Halo Nora Photobooth, saya ingin booking:`,
      `Nama: ${form.name}`,
      `No. WhatsApp: ${form.whatsapp}`,
      `Tanggal Acara: ${form.eventDate}`,
      `Paket: ${form.package}`,
      form.message ? `Catatan: ${form.message}` : undefined,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id='booking' className='relative bg-[#3A2E27] py-24'>
      <div className='mx-auto max-w-5xl px-6 lg:px-10'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-semibold tracking-[0.2em] text-[#C9A86A] uppercase'>
            Booking
          </span>
          <h2 className='mt-3 font-serif text-3xl font-bold text-[#FBF6F1] sm:text-4xl'>
            Amankan Tanggal Bahagiamu
          </h2>
          <p className='mt-4 text-[#D9C3AE]'>
            Isi form berikut, kami akan lanjutkan konfirmasi lewat WhatsApp
            dalam hitungan menit.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='mt-12 grid gap-6 rounded-3xl bg-[#FBF6F1] p-8 shadow-2xl sm:grid-cols-2 lg:p-10'
        >
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-[#3A2E27]'>
              Nama Lengkap
            </label>
            <input
              required
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='Nama kamu / pasangan'
              className='rounded-xl border border-[#E7D9C9] bg-white px-4 py-2.5 text-sm focus:border-[#C9A86A] focus:outline-none focus:ring-1 focus:ring-[#C9A86A]'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-[#3A2E27]'>
              Nomor WhatsApp
            </label>
            <input
              required
              name='whatsapp'
              value={form.whatsapp}
              onChange={handleChange}
              placeholder='08xx-xxxx-xxxx'
              className='rounded-xl border border-[#E7D9C9] bg-white px-4 py-2.5 text-sm focus:border-[#C9A86A] focus:outline-none focus:ring-1 focus:ring-[#C9A86A]'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-[#3A2E27]'>
              Tanggal Acara
            </label>
            <input
              required
              type='date'
              name='eventDate'
              value={form.eventDate}
              onChange={handleChange}
              className='rounded-xl border border-[#E7D9C9] bg-white px-4 py-2.5 text-sm focus:border-[#C9A86A] focus:outline-none focus:ring-1 focus:ring-[#C9A86A]'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-[#3A2E27]'>
              Paket Pilihan
            </label>
            <select
              name='package'
              value={form.package}
              onChange={handleChange}
              className='rounded-xl border border-[#E7D9C9] bg-white px-4 py-2.5 text-sm focus:border-[#C9A86A] focus:outline-none focus:ring-1 focus:ring-[#C9A86A]'
            >
              {PACKAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col gap-1.5 sm:col-span-2'>
            <label className='text-sm font-medium text-[#3A2E27]'>
              Catatan Tambahan (opsional)
            </label>
            <textarea
              name='message'
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder='Ceritakan tema, lokasi, atau kebutuhan khususmu...'
              className='resize-none rounded-xl border border-[#E7D9C9] bg-white px-4 py-2.5 text-sm focus:border-[#C9A86A] focus:outline-none focus:ring-1 focus:ring-[#C9A86A]'
            />
          </div>

          <button
            type='submit'
            className='inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1DA851] sm:col-span-2'
          >
            <FaWhatsapp className='text-lg' />
            Kirim via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
