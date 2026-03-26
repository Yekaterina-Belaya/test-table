import { createContext, useState, useEffect, ReactNode } from 'react';

// Описываем, какие данные будут доступны во всем приложении
interface AuthContextType {
  user: any | null;       // Данные пользователя (имя, роль и т.д.)
  isLoading: boolean;     // Флаг загрузки (проверяем ли мы токен сейчас)
  login: (token: string) => void;
  logout: () => void;
}

// Создаем сам контекст (изначально пустой)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация проверки токена при первой загрузке
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Здесь будет ваш запрос к FastAPI / Laravel:
          // const res = await api.get('/me');
          // setUser(res.data);
          setUser({ id: 1, name: 'Developer' }); // Заглушка
        }
      } catch (e) {
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setUser({ id: 1, name: 'Developer' }); // В реальности — данные из ответа API
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    // Передаем данные и функции вниз по дереву
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};