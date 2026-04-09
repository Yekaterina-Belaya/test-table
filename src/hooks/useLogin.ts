import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';
// import api from '../api/axiosInstance';
import { TLoginInput } from '@/schemas/LoginSchema';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: TLoginInput) => {
      // const response = await api.post('/auth/login', {
      //   login: data.login,
      //   password: data.password,
      // });
      // return { ...response.data, remember: data.remember };
      if (data.login === 'admin' && data.password === 'admin') {
        return {
          accessToken: 'fake-jwt-token-123',
          user: { id: 1, name: 'Admin User', role: 'admin' },
          remember: data.remember,
        };
      }
    },
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      const storage = data.remember ? localStorage : sessionStorage;
      storage.setItem('token', data.accessToken);

      login(JSON.stringify(data.user));
      navigate('/', { replace: true });
    },
  });
};
