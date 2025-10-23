import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ExpenseService } from './expense.service';
import sendResponse from '../../../shared/sendResponse';
import { ICreateExpenseResonse } from './expense.interface';

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

export const ExpenseController = {
  createExpense,
};
