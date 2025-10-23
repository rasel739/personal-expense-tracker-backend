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

export const ExpenseService = {
  createExpense,
};
