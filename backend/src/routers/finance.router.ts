import { Router } from 'express';
import {
  createFinanceEntryController,
  deleteFinanceEntryController,
  getFinanceEntriesController,
  getFinanceSummaryController,
  updateFinanceEntryController,
} from '../controllers/finance.controller';
import { financeValidator } from '../validators/finance.validator';
import { expressValidation } from '../middleware/express-validation.middlewere';
import { jwtVerify } from '../middleware/jwt-verify.middlewere';
import { roleVerify } from '../middleware/role-verify.middlewere';

const financeRouter = Router();

financeRouter.use(jwtVerify, roleVerify(['SUPER_ADMIN', 'ADMIN']));

financeRouter.get('/', getFinanceEntriesController);
financeRouter.get('/summary', getFinanceSummaryController);
financeRouter.post('/', financeValidator, expressValidation, createFinanceEntryController);
financeRouter.patch('/:id', updateFinanceEntryController);
financeRouter.delete('/:id', deleteFinanceEntryController);

export default financeRouter;
