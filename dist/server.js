"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const prisma_1 = __importDefault(require("./shared/prisma"));
async function bootstrap() {
    try {
        await prisma_1.default.$connect();
        console.log('Connected to the database successfully');
        app_1.default.listen(config_1.default.port, () => {
            console.log(`Application is running on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log('Failed to connect to the database', error);
    }
}
bootstrap();
