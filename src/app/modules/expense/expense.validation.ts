import { z } from 'zod';

export const createExpenseZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    amount: z.number().positive('Amount must be positive'),
    category: z.string().min(1, 'Category is required'),
    type: z.enum(['INCOME', 'EXPENSE'], {
      message: 'Type must be either INCOME or EXPENSE',
    }),
    note: z.string().optional(),
  }),
});

export const updateExpenseZodSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive').optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    note: z.string().optional(),
  }),
});

export const expenseQueryZodSchema = z.object({
  query: z.object({
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    category: z.string().optional(),
  }),
});

export const ExpenseValidation = {
  createExpenseZodSchema,
  updateExpenseZodSchema,
  expenseQueryZodSchema,
};
