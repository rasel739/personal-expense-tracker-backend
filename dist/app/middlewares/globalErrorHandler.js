"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleClientError_1 = __importDefault(require("../../errors/handleClientError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const globalErrorHandler = (error, req, res, next) => {
    if (config_1.default.env === 'development') {
        console.error('🔥 Global Error Handler:', error);
    }
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessages = [];
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        message = 'Database validation error';
        errorMessages = [
            {
                path: '',
                message: error.message,
            },
        ];
        statusCode = 400;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        ({ statusCode, message, errorMessages } = simplifiedError);
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = (0, handleClientError_1.default)(error);
        ({ statusCode, message, errorMessages } = simplifiedError);
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error.statusCode || 500;
        message = error.message || 'Internal Server Error';
        errorMessages = [
            {
                path: '',
                message: error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message || 'Unexpected Error';
        errorMessages = [
            {
                path: '',
                message: error.message,
            },
        ];
    }
    else {
        message = 'Unknown error occurred';
        errorMessages = [
            {
                path: '',
                message: JSON.stringify(error),
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? error?.stack : undefined,
    });
};
exports.default = globalErrorHandler;
