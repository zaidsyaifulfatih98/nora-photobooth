import { NextFunction, Request, Response } from 'express';
import {
  createFinanceEntryService,
  deleteFinanceEntryService,
  getFinanceEntriesService,
  getFinanceSummaryService,
  updateFinanceEntryService,
} from '../services/finance.service';

export async function getFinanceEntriesController(req: Request, res: Response, next: NextFunction) {
  try {
    const { from, to } = req.query as { from?: string; to?: string };
    const entries = await getFinanceEntriesService({ from, to });
    res.status(200).json({ success: true, message: 'Finance entries fetched', data: entries });
  } catch (error) {
    next(error);
  }
}

export async function getFinanceSummaryController(req: Request, res: Response, next: NextFunction) {
  try {
    const { from, to } = req.query as { from?: string; to?: string };
    const summary = await getFinanceSummaryService({ from, to });
    res.status(200).json({ success: true, message: 'Finance summary fetched', data: summary });
  } catch (error) {
    next(error);
  }
}

export async function createFinanceEntryController(req: Request, res: Response, next: NextFunction) {
  try {
    const entry = await createFinanceEntryService(req.body, req.user!.id);
    res.status(201).json({ success: true, message: 'Finance entry created', data: entry });
  } catch (error) {
    next(error);
  }
}

export async function updateFinanceEntryController(req: Request, res: Response, next: NextFunction) {
  try {
    const entry = await updateFinanceEntryService(req.params.id as string, req.body);
    res.status(200).json({ success: true, message: 'Finance entry updated', data: entry });
  } catch (error) {
    next(error);
  }
}

export async function deleteFinanceEntryController(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteFinanceEntryService(req.params.id as string);
    res.status(200).json({ success: true, message: 'Finance entry deleted', data: {} });
  } catch (error) {
    next(error);
  }
}
