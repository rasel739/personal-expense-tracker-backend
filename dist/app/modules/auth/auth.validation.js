"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const userZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        email: zod_1.z.string({ error: 'Email is required' }),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ error: 'Email is required' }),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    }),
});
exports.AuthValidation = {
    userZodSchema,
    loginZodSchema,
};
