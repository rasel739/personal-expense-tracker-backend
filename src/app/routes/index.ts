import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import path from 'path';
import { ExpenseRoutes } from '../modules/expense/expense.route';

const router = express.Router();

const moduleRoutes = [
  // route modules will be added here
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/expense',
    route: ExpenseRoutes,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
