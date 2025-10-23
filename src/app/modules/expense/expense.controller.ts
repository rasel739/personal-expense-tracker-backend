import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ExpenseService } from './expense.service';
import sendResponse from '../../../shared/sendResponse';
import { ICreateExpenseResonse } from './expense.interface';
import { ExpenseType } from '@prisma/client';

const createExpense = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as { id: string };

  const result = await ExpenseService.createExpense(id, req.body);

  sendResponse<ICreateExpenseResonse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense created successfully',
    data: result,
  });
});

const getExpense = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as { id: string };

  const filters = {
    type: req.query.type as unknown as ExpenseType,
    category: req.query.category as string | undefined,
  };

  const result = await ExpenseService.getExpense(id, filters);

  sendResponse<ICreateExpenseResonse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenses retrieved successfully',
    data: result,
  });
});

export const ExpenseController = {
  createExpense,
  getExpense,
};
