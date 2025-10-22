import { PrismaClient } from '@prisma/client';
import config from '../config';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
  log: config.env === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export default prisma;
