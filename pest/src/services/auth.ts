import api from './api';

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'TECHNICIAN';

export interface AuthUser {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    avatarUrl?: string | null;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
}

export interface UpdateProfilePayload {
    fullName?: string;
    phone?: string | null;
    avatarUrl?: string | null;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const AuthService = {
    async register(payload: RegisterPayload): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/auth/register', payload);
        persistSession(data);
        return data;
    },

    async login(payload: LoginPayload): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/auth/login', payload);
        persistSession(data);
        return data;
    },

    startSession(data: AuthResponse): AuthUser {
        persistSession(data);
        return data.user;
    },

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
            clearSession();
        }
    },

    async me(): Promise<AuthUser> {
        const { data } = await api.get<AuthUser>('/auth/me');
        localStorage.setItem(USER_KEY, JSON.stringify(data));
        return data;
    },

    async updateProfile(payload: UpdateProfilePayload): Promise<AuthUser> {
        const { data } = await api.patch<AuthUser>('/auth/me', payload);
        localStorage.setItem(USER_KEY, JSON.stringify(data));
        return data;
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    getStoredUser(): AuthUser | null {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem(TOKEN_KEY);
    },
};

function persistSession(data: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export default AuthService;