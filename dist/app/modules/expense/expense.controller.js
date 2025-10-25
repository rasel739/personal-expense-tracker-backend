"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const expense_service_1 = require("./expense.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createExpense = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.user;
    const result = await expense_service_1.ExpenseService.createExpense(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expense created successfully',
        data: result,
    });
});
const getExpense = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.user;
    const filters = {
        type: req.query.type,
        category: req.query.category,
    };
    const result = await expense_service_1.ExpenseService.getExpense(id, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expenses retrieved successfully',
        data: result,
    });
});
const getExpenseSummary = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.user;
    const result = await expense_service_1.ExpenseService.getExpenseSummary(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expense summary retrieved successfully',
        data: result,
    });
});
const updateExpense = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.user;
    const { expenseId } = req.params;
    const result = await expense_service_1.ExpenseService.updateExpense(id, expenseId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expense updated successfully',
        data: result,
    });
});
const deleteExpense = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.user;
    const { expenseId } = req.params;
    const result = await expense_service_1.ExpenseService.deleteExpense(id, expenseId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expense deleted successfully',
        data: result,
    });
});
exports.ExpenseController = {
    createExpense,
    getExpense,
    getExpenseSummary,
    updateExpense,
    deleteExpense,
};
