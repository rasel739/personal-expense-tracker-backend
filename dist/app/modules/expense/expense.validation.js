"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseValidation = exports.expenseQueryZodSchema = exports.updateExpenseZodSchema = exports.createExpenseZodSchema = void 0;
const zod_1 = require("zod");
exports.createExpenseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        amount: zod_1.z.number().positive('Amount must be positive'),
        category: zod_1.z.string().min(1, 'Category is required'),
        type: zod_1.z.enum(['INCOME', 'EXPENSE'], {
            message: 'Type must be either INCOME or EXPENSE',
        }),
        note: zod_1.z.string().optional(),
    }),
});
exports.updateExpenseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().positive('Amount must be positive').optional(),
        type: zod_1.z.enum(['INCOME', 'EXPENSE']).optional(),
        note: zod_1.z.string().optional(),
    }),
});
exports.expenseQueryZodSchema = zod_1.z.object({
    query: zod_1.z.object({
        type: zod_1.z.enum(['INCOME', 'EXPENSE']).optional(),
        category: zod_1.z.string().optional(),
    }),
});
exports.ExpenseValidation = {
    createExpenseZodSchema: exports.createExpenseZodSchema,
    updateExpenseZodSchema: exports.updateExpenseZodSchema,
    expenseQueryZodSchema: exports.expenseQueryZodSchema,
};
