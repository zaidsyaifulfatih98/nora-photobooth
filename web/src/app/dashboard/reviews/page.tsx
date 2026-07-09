'use client';

import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiStar } from 'react-icons/fi';
import {
  ReviewItem,
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from '@/features/reviews/api';

interface FormState {
  name: string;
  eventLabel: string;
  quote: string;
  rating: number;
  isPublished: boolean;
}

const emptyForm: FormState = {
  name: '',
  eventLabel: '',
  quote: '',
  rating: 5,
  isPublished: true,
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    const data = await getReviews(true);
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (review: ReviewItem) => {
    setEditingId(review.id);
    setForm({
      name: review.name,
      eventLabel: review.eventLabel,
      quote: review.quote,
      rating: review.rating,
      isPublished: review.isPublished,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await updateReview(editingId, form);
      } else {
        await createReview(form);
      }
      setShowForm(false);
      await loadReviews();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteReview(id);
    await loadReviews();
  };

  const handleTogglePublished = async (review: ReviewItem) => {
    await updateReview(review.id, { isPublished: !review.isPublished });
    await loadReviews();
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          Kelola testimoni pasangan yang tampil di landing page.
        </p>
        <button
          onClick={openCreateForm}
          className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
        >
          <FiPlus />
          Tambah Review
        </button>
      </div>

      {showForm && (
        <div className='rounded-2xl bg-white p-6 shadow-md'>
          <div className='flex items-center justify-between'>
            <h2 className='text-base font-semibold text-gray-800'>
              {editingId ? 'Edit Review' : 'Tambah Review Baru'}
            </h2>
            <button onClick={() => setShowForm(false)} className='text-gray-400 hover:text-gray-600'>
              <FiX />
            </button>
          </div>

          <form onSubmit={handleSubmit} className='mt-4 grid gap-4 sm:grid-cols-2'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-gray-700'>Nama Pasangan</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder='mis. Sarah & Bima'
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-gray-700'>Info Acara</label>
              <input
                required
                value={form.eventLabel}
                onChange={(e) => setForm({ ...form, eventLabel: e.target.value })}
                placeholder='mis. Resepsi, Mei 2026'
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-gray-700'>Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} bintang
                  </option>
                ))}
              </select>
            </div>

            <label className='flex items-center gap-2 pt-6 text-sm text-gray-600'>
              <input
                type='checkbox'
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
              />
              Tampilkan di landing page
            </label>

            <div className='flex flex-col gap-1.5 sm:col-span-2'>
              <label className='text-sm font-medium text-gray-700'>Testimoni</label>
              <textarea
                required
                rows={3}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                className='resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <button
              type='submit'
              disabled={submitting}
              className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 sm:col-span-2'
            >
              {submitting ? 'Menyimpan...' : 'Simpan Review'}
            </button>
          </form>
        </div>
      )}

      <div className='grid gap-6 lg:grid-cols-3'>
        {loading && <p className='text-sm text-gray-400'>Memuat review...</p>}

        {!loading && reviews.length === 0 && (
          <p className='text-sm text-gray-400'>Belum ada review.</p>
        )}

        {reviews.map((review) => (
          <div key={review.id} className='flex flex-col rounded-2xl bg-white p-6 shadow-md'>
            <div className='flex items-center gap-1 text-amber-500'>
              {Array.from({ length: review.rating }).map((_, i) => (
                <FiStar key={i} className='fill-current text-sm' />
              ))}
            </div>
            <p className='mt-3 flex-1 text-sm text-gray-600 italic'>&ldquo;{review.quote}&rdquo;</p>
            <div className='mt-4 border-t border-gray-100 pt-3'>
              <p className='text-sm font-bold text-gray-900'>{review.name}</p>
              <p className='text-xs text-gray-400'>{review.eventLabel}</p>
            </div>

            <div className='mt-4 flex items-center justify-between border-t border-gray-100 pt-3'>
              <label className='flex items-center gap-2 text-xs text-gray-500'>
                <input
                  type='checkbox'
                  checked={review.isPublished}
                  onChange={() => handleTogglePublished(review)}
                />
                Tampilkan
              </label>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => openEditForm(review)}
                  className='text-gray-400 hover:text-blue-600'
                  aria-label='Edit'
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
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
