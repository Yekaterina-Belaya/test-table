import { LoginInput } from '@/schemas/LoginSchema';
import api from '../axiosInstance';

export const authService = {
  login: async (data: LoginInput) => {
    const response = await api.post('/auth/login', {
      login: data.login,
      password: data.password,
      expiresInMins: 60,
    });

    const { token } = response.data;

    if (data.remember) {
      localStorage.setItem('auth_token', token);
    } else {
      sessionStorage.setItem('auth_token', token);
    }

    return response.data;
  },

  getToken: () =>
    localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token'),

  logout: () => {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  },
};
