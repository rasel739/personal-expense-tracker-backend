import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodType } from 'zod';

const validateRequest =
  (schema: ZodObject | ZodType<ZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
