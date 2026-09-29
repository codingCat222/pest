"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const missing = ['DATABASE_URL', 'JWT_SECRET'].filter((k) => !process.env[k]);
if (missing.length > 0) {
    console.error(`Missing required environment variable(s): ${missing.join(', ')}`);
    process.exit(1);
}
const server_1 = __importDefault(require("./server"));
const PORT = process.env.PORT || 4000;
server_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
