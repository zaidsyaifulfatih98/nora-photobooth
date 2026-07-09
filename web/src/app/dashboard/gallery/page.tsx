'use client';

import { useEffect, useRef, useState } from 'react';
import { FiTrash2, FiUpload } from 'react-icons/fi';
import {
  GalleryPhotoItem,
  deleteGalleryPhoto,
  getGalleryPhotos,
  updateGalleryPhoto,
  uploadGalleryPhoto,
} from '@/features/gallery/api';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPhotos = async () => {
    setLoading(true);
    const data = await getGalleryPhotos(true);
    setPhotos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadGalleryPhoto(file, caption || undefined);
      setCaption('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await loadPhotos();
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteGalleryPhoto(id);
    await loadPhotos();
  };

  const handleToggleActive = async (photo: GalleryPhotoItem) => {
    await updateGalleryPhoto(photo.id, { isActive: !photo.isActive });
    await loadPhotos();
  };

  return (
    <div className='space-y-6'>
      <div className='rounded-2xl bg-white p-6 shadow-md'>
        <h2 className='text-base font-semibold text-gray-800'>Unggah Foto Baru</h2>
        <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center'>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder='Keterangan foto (opsional)'
            className='flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
          <label className='flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'>
            <FiUpload />
            {uploading ? 'Mengunggah...' : 'Pilih & Unggah Foto'}
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              disabled={uploading}
              className='hidden'
            />
          </label>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
        {loading && <p className='text-sm text-gray-400'>Memuat galeri...</p>}

        {!loading && photos.length === 0 && (
          <p className='text-sm text-gray-400'>Belum ada foto di galeri.</p>
        )}

        {photos.map((photo) => (
          <div
            key={photo.id}
            className='group relative overflow-hidden rounded-2xl bg-white shadow-md'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.caption ?? 'Galeri Nora Photobooth'}
              className='h-40 w-full object-cover'
            />
            <div className='p-3'>
              <p className='truncate text-xs text-gray-500'>
                {photo.caption || 'Tanpa keterangan'}
              </p>
              <div className='mt-2 flex items-center justify-between'>
                <label className='flex items-center gap-1.5 text-xs text-gray-500'>
                  <input
                    type='checkbox'
                    checked={photo.isActive}
                    onChange={() => handleToggleActive(photo)}
                  />
                  Aktif
                </label>
                <button
                  onClick={() => handleDelete(photo.id)}
                  aria-label='Hapus'
                  className='text-gray-400 hover:text-red-500'
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
