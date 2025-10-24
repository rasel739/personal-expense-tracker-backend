import httpStatus from 'http-status';
import { ExpenseType } from '@prisma/client';
import prisma from '../../../shared/prisma';
import {
  ICreateExpense,
  ICreateExpenseResonse,
  IExpenseSummary,
  IUpdateExpense,
} from './expense.interface';
import ApiError from '../../../errors/ApiError';

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

const getExpenseSummary = async (userId: string): Promise<IExpenseSummary> => {
  const expenses = await prisma.expense.findMany({
    where: { userId },
  });

  const totalIncome = expenses
    .filter((expense) => expense.type === 'INCOME')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpense = expenses
    .filter((expense) => expense.type === 'EXPENSE')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const balance = totalIncome - totalExpense;
  const balanceStatus = balance >= 0 ? 'Positive' : 'Negative';

  return {
    totalIncome,
    totalExpense,
    balance,
    balanceStatus,
  };
};

const updateExpense = async (userId: string, expenseId: string, payload: IUpdateExpense) => {
  const expense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
  });

  if (!expense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense not found');
  }

  if (expense.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to update this expense');
  }

  let isLarge = expense.isLarge;

  if (payload.type === 'EXPENSE' && payload.amount && payload.amount > 5000) {
    isLarge = true;
  } else if (payload.type === 'EXPENSE' && payload.amount && payload.amount <= 5000) {
    isLarge = false;
  } else if (payload.type === 'INCOME') {
    isLarge = false;
  } else if (!payload.type && payload.amount) {
    if (expense.type === 'EXPENSE' && payload.amount > 5000) {
      isLarge = true;
    } else {
      isLarge = false;
    }
  }

  const updatedExpense = await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      ...payload,
      isLarge,
    },
  });

  return updatedExpense;
};

const deleteExpense = async (userId: string, expenseId: string): Promise<{ deleteId: string }> => {
  const expense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
  });

  if (!expense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense not found');
  }

  if (expense.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to delete this expense');
  }

  await prisma.expense.delete({
    where: {
      id: expenseId,
    },
  });

  return {
    deleteId: expenseId,
  };
};

export const ExpenseService = {
  createExpense,
  getExpense,
  getExpenseSummary,
  updateExpense,
  deleteExpense,
};
