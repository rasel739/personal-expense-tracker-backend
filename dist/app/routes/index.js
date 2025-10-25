"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const expense_route_1 = require("../modules/expense/expense.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // route modules will be added here
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/expense',
        route: expense_route_1.ExpenseRoutes,
    },
];
moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));
exports.default = router;
