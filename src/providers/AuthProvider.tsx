import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;       
  isLoading: boolean;     
  login: (userData: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      setUser({ id: 1, name: 'Developer' }); 
    }
    setIsLoading(false);
  };
  checkAuth();
}, []);

  const login = (userData: string) => {
    setUser(userData)
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