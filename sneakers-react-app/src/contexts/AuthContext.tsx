import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('sneakers_auth_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error('Failed to parse user from localStorage', e);
                localStorage.removeItem('sneakers_auth_user');
            }
        }
    }, []);

    const login = async (email: string, password: string, rememberMe: boolean = true) => {
        setIsLoading(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Mock validation
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            // Create mock user
            const newUser: User = {
                id: `user_${Date.now()}`,
                fullName: email.split('@')[0].replace(/[._-]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                createdAt: new Date().toISOString(),
            };

            setUser(newUser);
            localStorage.setItem('sneakers_auth_user', JSON.stringify(newUser));
            
            if (rememberMe) {
                localStorage.setItem('sneakers_remember_email', email);
            } else {
                localStorage.removeItem('sneakers_remember_email');
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (fullName: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock validation
            if (!fullName || !email || !password) {
                throw new Error('All fields are required');
            }

            // Create mock user
            const newUser: User = {
                id: `user_${Date.now()}`,
                fullName,
                email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                createdAt: new Date().toISOString(),
            };

            setUser(newUser);
            localStorage.setItem('sneakers_auth_user', JSON.stringify(newUser));
            localStorage.removeItem('sneakers_remember_email');
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sneakers_auth_user');
        localStorage.removeItem('sneakers_remember_email');
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
