"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const TOKEN_EXPIRY = '7d';
function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw { status: 500, message: 'Server misconfigured: JWT_SECRET is not set' };
    }
    return secret;
}
function normalizeEmail(email) {
    return typeof email === 'string' ? email.trim().toLowerCase() : '';
}
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
async function claimUnlinkedCases(userId, email) {
    await prisma_1.default.case.updateMany({
        where: { userId: null, customerEmail: email },
        data: { userId },
    });
}
exports.AuthService = {
    async register(data) {
        const email = normalizeEmail(data.email);
        const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
        if (!EMAIL_REGEX.test(email)) {
            throw { status: 400, message: 'Please provide a valid email address' };
        }
        if (!fullName) {
            throw { status: 400, message: 'Full name is required' };
        }
        if (typeof data.password !== 'string' || data.password.length < 8) {
            throw { status: 400, message: 'Password must be at least 8 characters' };
        }
        const existing = await prisma_1.default.user.findUnique({ where: { email } });
        if (existing) {
            throw { status: 409, message: 'An account with this email already exists' };
        }
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email,
                passwordHash,
                fullName,
                phone: data.phone?.trim() || undefined,
                role: 'CUSTOMER',
            },
        });
        await claimUnlinkedCases(user.id, email);
        const token = this.signToken({ userId: user.id, email: user.email, role: user.role });
        return { user: this.sanitizeUser(user), token };
    },
    async login(data) {
        const email = normalizeEmail(data.email);
        if (!email || typeof data.password !== 'string' || !data.password) {
            throw { status: 400, message: 'Email and password are required' };
        }
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            throw { status: 401, message: 'Invalid email or password' };
        }
        const valid = await bcrypt_1.default.compare(data.password, user.passwordHash);
        if (!valid) {
            throw { status: 401, message: 'Invalid email or password' };
        }
        if (user.role === 'CUSTOMER') {
            await claimUnlinkedCases(user.id, email);
        }
        const token = this.signToken({ userId: user.id, email: user.email, role: user.role });
        return { user: this.sanitizeUser(user), token };
    },
    async me(userId) {
        const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }
        return this.sanitizeUser(user);
    },
    signToken(payload) {
        return jsonwebtoken_1.default.sign(payload, getSecret(), { expiresIn: TOKEN_EXPIRY });
    },
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, getSecret());
    },
    sanitizeUser(user) {
        const { passwordHash, ...safe } = user;
        return safe;
    },
};
