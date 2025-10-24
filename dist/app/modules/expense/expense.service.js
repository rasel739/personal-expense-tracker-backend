"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createExpense = async (userId, payload) => {
    const isLarge = payload.type === 'EXPENSE' && payload.amount > 5000;
    const expense = await prisma_1.default.expense.create({
        data: {
            ...payload,
            isLarge,
            userId,
        },
    });
    return expense;
};
const getExpense = async (userId, filters) => {
    const whereClause = { userId };
    const expenses = await prisma_1.default.expense.findMany({
        where: {
            userId,
            ...(filters?.type && { type: filters.type }),
            ...(filters?.category && { category: filters.category }),
        },
        orderBy: { createdAt: 'desc' },
    });
    return expenses;
};
const getExpenseSummary = async (userId) => {
    const expenses = await prisma_1.default.expense.findMany({
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
const updateExpense = async (userId, expenseId, payload) => {
    const expense = await prisma_1.default.expense.findUnique({
        where: {
            id: expenseId,
        },
    });
    if (!expense) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Expense not found');
    }
    if (expense.userId !== userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to update this expense');
    }
    let isLarge = expense.isLarge;
    if (payload.type === 'EXPENSE' && payload.amount && payload.amount > 5000) {
        isLarge = true;
    }
    else if (payload.type === 'EXPENSE' && payload.amount && payload.amount <= 5000) {
        isLarge = false;
    }
    else if (payload.type === 'INCOME') {
        isLarge = false;
    }
    else if (!payload.type && payload.amount) {
        if (expense.type === 'EXPENSE' && payload.amount > 5000) {
            isLarge = true;
        }
        else {
            isLarge = false;
        }
    }
    const updatedExpense = await prisma_1.default.expense.update({
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
const deleteExpense = async (userId, expenseId) => {
    const expense = await prisma_1.default.expense.findUnique({
        where: {
            id: expenseId,
        },
    });
    if (!expense) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Expense not found');
    }
    if (expense.userId !== userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to delete this expense');
    }
    await prisma_1.default.expense.delete({
        where: {
            id: expenseId,
        },
    });
    return {
        deleteId: expenseId,
    };
};
exports.ExpenseService = {
    createExpense,
    getExpense,
    getExpenseSummary,
    updateExpense,
    deleteExpense,
};
