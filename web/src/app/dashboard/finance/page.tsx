'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiDollarSign, FiTrendingDown } from 'react-icons/fi';
import {
  FinanceEntryItem,
  FinanceSummary,
  createFinanceEntry,
  deleteFinanceEntry,
  getFinanceEntries,
  getFinanceSummary,
} from '@/features/finance/api';

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

const initialForm = {
  type: 'INCOME' as 'INCOME' | 'EXPENSE',
  category: '',
  amount: '',
  date: new Date().toISOString().slice(0, 10),
  description: '',
};

export default function FinancePage() {
  const [entries, setEntries] = useState<FinanceEntryItem[]>([]);
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  const loadData = async () => {
    setLoading(true);
    const [entriesData, summaryData] = await Promise.all([
      getFinanceEntries(),
      getFinanceSummary(),
    ]);
    setEntries(entriesData);
    setSummary(summaryData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createFinanceEntry({
        type: form.type,
        category: form.category,
        amount: Number(form.amount),
        date: new Date(form.date).toISOString(),
        description: form.description || undefined,
      });
      setForm(initialForm);
      await loadData();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteFinanceEntry(id);
    await loadData();
  };

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 sm:grid-cols-3'>
        <div className='rounded-2xl bg-white p-5 shadow-md'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-green-100'>
            <FiDollarSign className='text-lg text-green-600' />
          </div>
          <p className='mt-2 text-sm text-gray-500'>Total Pemasukan</p>
          <p className='text-xl font-bold text-gray-900'>
            {formatRupiah(summary?.totalIncome ?? 0)}
          </p>
        </div>
        <div className='rounded-2xl bg-white p-5 shadow-md'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-red-100'>
            <FiTrendingDown className='text-lg text-red-500' />
          </div>
          <p className='mt-2 text-sm text-gray-500'>Total Pengeluaran</p>
          <p className='text-xl font-bold text-gray-900'>
            {formatRupiah(summary?.totalExpense ?? 0)}
          </p>
        </div>
        <div className='rounded-2xl bg-white p-5 shadow-md'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1E4D6]'>
            <FiDollarSign className='text-lg text-[#8F6F3E]' />
          </div>
          <p className='mt-2 text-sm text-gray-500'>Saldo</p>
          <p className='text-xl font-bold text-gray-900'>
            {formatRupiah(summary?.balance ?? 0)}
          </p>
        </div>
      </div>

      <div className='rounded-2xl bg-white p-6 shadow-md'>
        <h2 className='text-base font-semibold text-gray-800'>
          Catat Transaksi Baru
        </h2>
        <form
          onSubmit={handleSubmit}
          className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5'
        >
          <select
            name='type'
            value={form.type}
            onChange={handleChange}
            className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            <option value='INCOME'>Pemasukan</option>
            <option value='EXPENSE'>Pengeluaran</option>
          </select>

          <input
            required
            name='category'
            value={form.category}
            onChange={handleChange}
            placeholder='Kategori (mis. Booking Paket Gold)'
            className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-2'
          />

          <input
            required
            type='number'
            min={0}
            name='amount'
            value={form.amount}
            onChange={handleChange}
            placeholder='Nominal (Rp)'
            className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />

          <input
            required
            type='date'
            name='date'
            value={form.date}
            onChange={handleChange}
            className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />

          <input
            name='description'
            value={form.description}
            onChange={handleChange}
            placeholder='Catatan (opsional)'
            className='rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-2 lg:col-span-4'
          />

          <button
            type='submit'
            disabled={submitting}
            className='flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60'
          >
            <FiPlus />
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      </div>

      <div className='rounded-2xl bg-white shadow-md'>
        <div className='border-b border-gray-100 px-6 py-4'>
          <h2 className='text-base font-semibold text-gray-800'>
            Riwayat Transaksi
          </h2>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead>
              <tr className='border-b border-gray-100 text-gray-500'>
                <th className='px-6 py-3 font-medium'>Tanggal</th>
                <th className='px-6 py-3 font-medium'>Kategori</th>
                <th className='px-6 py-3 font-medium'>Tipe</th>
                <th className='px-6 py-3 font-medium'>Nominal</th>
                <th className='px-6 py-3 font-medium'>Dicatat oleh</th>
                <th className='px-6 py-3 font-medium'></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className='px-6 py-8 text-center text-gray-400'>
                    Memuat data...
                  </td>
                </tr>
              )}
              {!loading && entries.length === 0 && (
                <tr>
                  <td colSpan={6} className='px-6 py-8 text-center text-gray-400'>
                    Belum ada transaksi tercatat.
                  </td>
                </tr>
              )}
              {entries.map((entry) => (
                <tr key={entry.id} className='border-b border-gray-50'>
                  <td className='px-6 py-3 text-gray-700'>
                    {new Date(entry.date).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className='px-6 py-3 text-gray-700'>
                    {entry.category}
                    {entry.description && (
                      <p className='text-xs text-gray-400'>{entry.description}</p>
                    )}
                  </td>
                  <td className='px-6 py-3'>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        entry.type === 'INCOME'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {entry.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran'}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      entry.type === 'INCOME' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {entry.type === 'INCOME' ? '+' : '-'}
                    {formatRupiah(Number(entry.amount))}
                  </td>
                  <td className='px-6 py-3 text-gray-500'>
                    {entry.createdBy?.firstName} {entry.createdBy?.lastName}
                  </td>
                  <td className='px-6 py-3 text-right'>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      aria-label='Hapus'
                      className='text-gray-400 hover:text-red-500'
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
