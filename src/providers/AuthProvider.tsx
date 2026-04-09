import { TUser } from '@/types/user';
import { createContext, useState, useEffect, ReactNode, FC } from 'react';

type TAuthContext = {
  user: TUser | null;
  isLoading: boolean;
  login: (userData: TUser) => void;
  logout: () => void;
};

type TPropWithChildren = {
  children: ReactNode
}

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider: FC<TPropWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem('token');
      if (token) {
        setUser({ id: 1, name: 'Developer' });
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (userData: TUser) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
