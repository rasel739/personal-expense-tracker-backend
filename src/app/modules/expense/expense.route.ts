import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ExpenseValidation } from './expense.validation';
import { ExpenseController } from './expense.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Protect all routes after this middleware

router.use(auth);

router.post(
  '/',
  validateRequest(ExpenseValidation.createExpenseZodSchema),
  ExpenseController.createExpense
);

router.get(
  '/',
  validateRequest(ExpenseValidation.expenseQueryZodSchema),
  ExpenseController.getExpense
);

router.get('/summary', ExpenseController.getExpenseSummary);

router.patch(
  '/:expenseId',
  validateRequest(ExpenseValidation.updateExpenseZodSchema),
  ExpenseController.updateExpense
);

router.delete('/:expenseId', ExpenseController.deleteExpense);

export const ExpenseRoutes = router;
