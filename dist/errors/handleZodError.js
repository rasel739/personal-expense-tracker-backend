"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errors = error.issues.map((issue) => {
        const rawPath = issue?.path[issue.path.length - 1];
        const path = typeof rawPath === 'symbol' ? rawPath.toString() : rawPath;
        return {
            path,
            message: issue?.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = handleZodError;
