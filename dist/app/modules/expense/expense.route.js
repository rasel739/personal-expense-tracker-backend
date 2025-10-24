"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const expense_validation_1 = require("./expense.validation");
const expense_controller_1 = require("./expense.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Protect all routes after this middleware
router.use(auth_1.default);
router.post('/', (0, validateRequest_1.default)(expense_validation_1.ExpenseValidation.createExpenseZodSchema), expense_controller_1.ExpenseController.createExpense);
router.get('/', (0, validateRequest_1.default)(expense_validation_1.ExpenseValidation.expenseQueryZodSchema), expense_controller_1.ExpenseController.getExpense);
router.get('/summary', expense_controller_1.ExpenseController.getExpenseSummary);
router.patch('/:expenseId', (0, validateRequest_1.default)(expense_validation_1.ExpenseValidation.updateExpenseZodSchema), expense_controller_1.ExpenseController.updateExpense);
router.delete('/:expenseId', expense_controller_1.ExpenseController.deleteExpense);
exports.ExpenseRoutes = router;
