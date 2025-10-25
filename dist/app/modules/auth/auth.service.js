"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const userRegister = async (payload) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email: payload.email },
    });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already exists');
    }
    const hashedPassword = await bcrypt_1.default.hash(payload.password, Number(config_1.default.bycrypt_salt_rounds));
    const newUser = await prisma_1.default.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
        },
    });
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id: newUser.id, email: newUser.email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
};
const userLogin = async (payload) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email: payload.email },
    });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid credentials');
    }
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, existingUser.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id: existingUser.id, email: existingUser.email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
};
const getUser = async (userId) => {
    const userCheck = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!userCheck) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const user = {
        id: userCheck.id,
        name: userCheck.name,
        email: userCheck.email,
    };
    return {
        user,
    };
};
exports.AuthService = {
    userRegister,
    userLogin,
    getUser,
};
