import prisma from '../configs/pool-connection.config';
import { AppError } from '../utils/app-error.utils';

interface FinanceEntryPayload {
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  description?: string;
  date: string;
}

interface FinanceFilters {
  from?: string;
  to?: string;
}

function buildDateFilter({ from, to }: FinanceFilters) {
  if (!from && !to) return {};

  return {
    date: {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    },
  };
}

export async function getFinanceEntriesService(filters: FinanceFilters) {
  return prisma.financeEntry.findMany({
    where: { deletedAt: null, ...buildDateFilter(filters) },
    include: { createdBy: { select: { firstName: true, lastName: true } } },
    orderBy: { date: 'desc' },
  });
}

export async function getFinanceSummaryService(filters: FinanceFilters) {
  const entries = await prisma.financeEntry.findMany({
    where: { deletedAt: null, ...buildDateFilter(filters) },
    select: { type: true, amount: true },
  });

  const totalIncome = entries
    .filter((e) => e.type === 'INCOME')
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalExpense = entries
    .filter((e) => e.type === 'EXPENSE')
    .reduce((sum, e) => sum + Number(e.amount), 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
}

export async function createFinanceEntryService(data: FinanceEntryPayload, createdById: string) {
  return prisma.financeEntry.create({
    data: {
      type: data.type,
      category: data.category,
      amount: data.amount,
      description: data.description,
      date: new Date(data.date),
      createdById,
    },
  });
}

export async function updateFinanceEntryService(
  id: string,
  data: Partial<FinanceEntryPayload>,
) {
  const existing = await prisma.financeEntry.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw AppError('Finance entry not found', 404);
  }

  return prisma.financeEntry.update({
    where: { id },
    data: {
      ...data,
      ...(data.date ? { date: new Date(data.date) } : {}),
    },
  });
}

export async function deleteFinanceEntryService(id: string) {
  const existing = await prisma.financeEntry.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw AppError('Finance entry not found', 404);
  }

  return prisma.financeEntry.update({ where: { id }, data: { deletedAt: new Date() } });
}
