import { ExpenseType } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICreateExpense, ICreateExpenseResonse } from './expense.interface';

const createExpense = async (
  userId: string,
  payload: ICreateExpense
): Promise<ICreateExpenseResonse> => {
  const isLarge = payload.type === 'EXPENSE' && payload.amount > 5000;

  const expense = await prisma.expense.create({
    data: {
      ...payload,
      isLarge,
      userId,
    },
  });

  return expense;
};

const getExpense = async (
  userId: string,
  filters?: { type: ExpenseType; category?: string }
): Promise<ICreateExpenseResonse[]> => {
  const whereClause: any = { userId };

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      ...(filters?.type && { type: filters.type }),
      ...(filters?.category && { category: filters.category }),
    },
    orderBy: { createdAt: 'desc' },
  });

  return expenses;
};

export const ExpenseService = {
  createExpense,
  getExpense,
};
