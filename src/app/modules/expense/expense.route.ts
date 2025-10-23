import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ExpenseValidation } from './expense.validation';
import { ExpenseController } from './expense.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Protect all routes after this middleware

router.use(auth);

router.post(
  '/create',
  validateRequest(ExpenseValidation.createExpenseZodSchema),
  ExpenseController.createExpense
);

export const ExpenseRoutes = router;
