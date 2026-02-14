import React, { createContext, useContext, useState, useCallback } from 'react';
import { Role, User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: Role) => boolean;
  signup: (data: Omit<User, 'id' | 'status' | 'createdAt' | 'plan' | 'role'> & { role: Role }) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string, role: Role): boolean => {
    // Mock login - always succeeds
    setUser({
      id: '1',
      firstName: role === 'admin' ? 'Admin' : 'John',
      lastName: role === 'admin' ? 'User' : 'Doe',
      email,
      phone: '+1234567890',
      address: '123 Main St',
      city: 'New York',
      role,
      status: 'active',
      createdAt: new Date().toISOString(),
      plan: 'free',
    });
    return true;
  }, []);

  const signup = useCallback((data: Omit<User, 'id' | 'status' | 'createdAt' | 'plan' | 'role'> & { role: Role }): boolean => {
    setUser({
      ...data,
      id: Math.random().toString(36).slice(2),
      status: 'active',
      createdAt: new Date().toISOString(),
      plan: 'free',
    });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
