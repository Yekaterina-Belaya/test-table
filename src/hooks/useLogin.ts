import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import api from '../api/axiosInstance';
import { LoginInput } from '@/schemas/LoginSchema';

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await api.post('/auth/login', {
        login: data.login,
        password: data.password,
      });
      return { ...response.data, remember: data.remember };
    },
    onSuccess: (data) => {
      const storage = data.remember ? localStorage : sessionStorage;
      storage.setItem('token', data.accessToken);
      
      login(data.user); 
    },
  });
};