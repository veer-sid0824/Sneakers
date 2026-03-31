import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_STORAGE_KEY = 'sneakers_auth_user';
const AUTH_TOKEN_STORAGE_KEY = 'sneakers_auth_token';
const REMEMBER_EMAIL_STORAGE_KEY = 'sneakers_remember_email';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface AuthApiResponse {
    message: string;
    token: string;
    user: User;
}

const getErrorMessage = async (response: Response): Promise<string> => {
    try {
        const data = await response.json();
        return data.message || 'Request failed';
    } catch {
        return `Request failed with status ${response.status}`;
    }
};

const withAvatar = (user: User): User => ({
    ...user,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email)}`,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser) as User;
                setUser(withAvatar(parsedUser));
            } catch (e) {
                console.error('Failed to parse user from localStorage', e);
                localStorage.removeItem(AUTH_USER_STORAGE_KEY);
                localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
            }
        }
    }, []);

    const login = async (email: string, password: string, rememberMe: boolean = true) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(await getErrorMessage(response));
            }

            const data = (await response.json()) as AuthApiResponse;
            const hydratedUser = withAvatar(data.user);

            setUser(hydratedUser);
            localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(hydratedUser));
            localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.token);

            if (rememberMe) {
                localStorage.setItem(REMEMBER_EMAIL_STORAGE_KEY, email);
            } else {
                localStorage.removeItem(REMEMBER_EMAIL_STORAGE_KEY);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (fullName: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password }),
            });

            if (!response.ok) {
                throw new Error(await getErrorMessage(response));
            }

            const data = (await response.json()) as AuthApiResponse;
            const hydratedUser = withAvatar(data.user);

            setUser(hydratedUser);
            localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(hydratedUser));
            localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.token);
            localStorage.removeItem(REMEMBER_EMAIL_STORAGE_KEY);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_USER_STORAGE_KEY);
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        localStorage.removeItem(REMEMBER_EMAIL_STORAGE_KEY);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
