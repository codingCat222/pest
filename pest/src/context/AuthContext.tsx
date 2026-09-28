import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthService, AuthUser, LoginPayload, RegisterPayload } from '../services/auth';

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (payload: LoginPayload) => Promise<AuthUser>;
    register: (payload: RegisterPayload) => Promise<AuthUser>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(AuthService.getStoredUser());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            if (AuthService.isAuthenticated()) {
                try {
                    const freshUser = await AuthService.me();
                    setUser(freshUser);
                } catch {
                    setUser(null);
                }
            }
            setIsLoading(false);
        };
        bootstrap();

        const handleUnauthorized = () => setUser(null);
        window.addEventListener('auth:unauthorized', handleUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
    }, []);

    const login = useCallback(async (payload: LoginPayload) => {
        const { user: loggedInUser } = await AuthService.login(payload);
        setUser(loggedInUser);
        return loggedInUser;
    }, []);

    const register = useCallback(async (payload: RegisterPayload) => {
        const { user: newUser } = await AuthService.register(payload);
        setUser(newUser);
        return newUser;
    }, []);

    const logout = useCallback(async () => {
        await AuthService.logout();
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
}