import express from 'express';

const router = express.Router();

const moduleRoutes = [
  // route modules will be added here
  {
    path: '/users',
    route: Object,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
