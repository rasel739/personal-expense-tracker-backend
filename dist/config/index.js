"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env'), quiet: true });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || '10',
    jwt: {
        secret: process.env.JWT_SECRET || 'd760c0868d0fb14ca0ba0878b0f85722',
        expires_in: process.env.JWT_EXPIRES_IN || '7d',
    },
};
