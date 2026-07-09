import axiosInstance from '@/utils/axiosInstance';

export type FinanceEntryType = 'INCOME' | 'EXPENSE';

export interface FinanceEntryItem {
  id: string;
  type: FinanceEntryType;
  category: string;
  amount: string;
  description: string | null;
  date: string;
  createdBy: { firstName: string; lastName: string };
}

export interface FinanceEntryPayload {
  type: FinanceEntryType;
  category: string;
  amount: number;
  description?: string;
  date: string;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export async function getFinanceEntries(params?: { from?: string; to?: string }) {
  const res = await axiosInstance.get('/finance', { params });
  return res.data.data as FinanceEntryItem[];
}

export async function getFinanceSummary(params?: { from?: string; to?: string }) {
  const res = await axiosInstance.get('/finance/summary', { params });
  return res.data.data as FinanceSummary;
}

export async function createFinanceEntry(payload: FinanceEntryPayload) {
  const res = await axiosInstance.post('/finance', payload);
  return res.data.data as FinanceEntryItem;
}

export async function deleteFinanceEntry(id: string) {
  await axiosInstance.delete(`/finance/${id}`);
}
