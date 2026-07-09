'use client';

import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import {
  PackageItem,
  createPackage,
  deletePackage,
  getPackages,
  updatePackage,
} from '@/features/packages/api';

function formatRupiah(value: string | number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value));
}

interface FormState {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string;
  isPopular: boolean;
  isActive: boolean;
}

const emptyForm: FormState = {
  name: '',
  price: '',
  duration: '',
  description: '',
  features: '',
  isPopular: false,
  isActive: true,
};

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadPackages = async () => {
    setLoading(true);
    const data = await getPackages(true);
    setPackages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (pkg: PackageItem) => {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      description: pkg.description,
      features: pkg.features.join('\n'),
      isPopular: pkg.isPopular,
      isActive: pkg.isActive,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        duration: form.duration,
        description: form.description,
        features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
        isPopular: form.isPopular,
        isActive: form.isActive,
      };

      if (editingId) {
        await updatePackage(editingId, payload);
      } else {
        await createPackage(payload);
      }

      setShowForm(false);
      await loadPackages();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deletePackage(id);
    await loadPackages();
  };

  const handleToggleActive = async (pkg: PackageItem) => {
    await updatePackage(pkg.id, { isActive: !pkg.isActive });
    await loadPackages();
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          Kelola harga, deskripsi, dan fitur paket yang tampil di landing page.
        </p>
        <button
          onClick={openCreateForm}
          className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
        >
          <FiPlus />
          Tambah Paket
        </button>
      </div>

      {showForm && (
        <div className='rounded-2xl bg-white p-6 shadow-md'>
          <div className='flex items-center justify-between'>
            <h2 className='text-base font-semibold text-gray-800'>
              {editingId ? 'Edit Paket' : 'Tambah Paket Baru'}
            </h2>
            <button onClick={() => setShowForm(false)} className='text-gray-400 hover:text-gray-600'>
              <FiX />
            </button>
          </div>

          <form onSubmit={handleSubmit} className='mt-4 grid gap-4 sm:grid-cols-2'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-gray-700'>Nama Paket</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-gray-700'>Harga (Rp)</label>
              <input
                required
                type='number'
                min={0}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-gray-700'>Durasi</label>
              <input
                required
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder='mis. 5 jam sesi'
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div className='flex items-center gap-6 pt-6'>
              <label className='flex items-center gap-2 text-sm text-gray-600'>
                <input
                  type='checkbox'
                  checked={form.isPopular}
                  onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                />
                Tandai Populer
              </label>
              <label className='flex items-center gap-2 text-sm text-gray-600'>
                <input
                  type='checkbox'
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                Aktif / Tampilkan
              </label>
            </div>

            <div className='flex flex-col gap-1.5 sm:col-span-2'>
              <label className='text-sm font-medium text-gray-700'>Deskripsi</label>
              <textarea
                required
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className='resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col gap-1.5 sm:col-span-2'>
              <label className='text-sm font-medium text-gray-700'>
                Fitur (satu baris = satu fitur)
              </label>
              <textarea
                required
                rows={5}
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder={'Backdrop custom sesuai tema\nCetak foto unlimited\n2 orang crew photobooth'}
                className='resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <button
              type='submit'
              disabled={submitting}
              className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 sm:col-span-2'
            >
              {submitting ? 'Menyimpan...' : 'Simpan Paket'}
            </button>
          </form>
        </div>
      )}

      <div className='grid gap-6 lg:grid-cols-3'>
        {loading && <p className='text-sm text-gray-400'>Memuat paket...</p>}

        {!loading &&
          packages.map((pkg) => (
            <div key={pkg.id} className='flex flex-col rounded-2xl bg-white p-6 shadow-md'>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-lg font-bold text-gray-900'>{pkg.name}</h3>
                  <p className='text-xs text-gray-400'>{pkg.duration}</p>
                </div>
                {pkg.isPopular && (
                  <span className='rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700'>
                    Populer
                  </span>
                )}
              </div>

              <p className='mt-3 text-xl font-bold text-gray-900'>
                {formatRupiah(pkg.price)}
              </p>
              <p className='mt-2 text-sm text-gray-500'>{pkg.description}</p>

              <ul className='mt-3 flex-1 space-y-1 text-sm text-gray-600'>
                {pkg.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>

              <div className='mt-4 flex items-center justify-between border-t border-gray-100 pt-4'>
                <label className='flex items-center gap-2 text-xs text-gray-500'>
                  <input
                    type='checkbox'
                    checked={pkg.isActive}
                    onChange={() => handleToggleActive(pkg)}
                  />
                  Aktif
                </label>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => openEditForm(pkg)}
                    className='text-gray-400 hover:text-blue-600'
                    aria-label='Edit'
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className='text-gray-400 hover:text-red-500'
                    aria-label='Hapus'
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
