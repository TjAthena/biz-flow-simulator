import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/lib/types';
import { mockAuthService } from '@/lib/mockServices';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setDemoUser: (role: 'admin' | 'vendor' | 'delivery' | 'customer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const loggedInUser = await mockAuthService.login(email, password);
      if (loggedInUser) {
        setUser(loggedInUser);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const setDemoUser = useCallback((role: 'admin' | 'vendor' | 'delivery' | 'customer') => {
    const demoUsers: Record<string, User> = {
      admin: { id: 'admin-1', email: 'admin@demo.com', name: 'Admin User', role: 'admin' },
      vendor: { id: 'vendor-1', email: 'vendor@demo.com', name: 'TechSoft Inc.', role: 'vendor' },
      delivery: { id: 'delivery-1', email: 'delivery@demo.com', name: 'John Driver', role: 'delivery' },
      customer: { id: 'customer-1', email: 'customer@demo.com', name: 'Jane Customer', role: 'customer' },
    };
    setUser(demoUsers[role]);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      setDemoUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
