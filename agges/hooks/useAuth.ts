import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { api } from '@/api/client';
import { AUTH_URLS } from '@/api';
import type { LoginCredentials, LoginResponse } from '@/api';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const login = async (credentials: LoginCredentials, tipo: number) => {
        setError('');
        setLoading(true);

        try {
            const { data } = await api.post<LoginResponse>(AUTH_URLS.LOGIN, credentials);

            console.log('Respuesta del backend:', data);

            // Guardar tokens JWT en Cookies
            if (data.tokens) {
                Cookies.set('access_token', data.tokens.access, { expires: 1, secure: true, sameSite: 'strict' });
                Cookies.set('refresh_token', data.tokens.refresh, { expires: 7, secure: true, sameSite: 'strict' });
                console.log('Tokens guardados correctamente en cookies');
            }

            // Guardar información del usuario en localStorage (no es sensible)
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log('Usuario guardado:', data.user);
            }

            // Navegar según el tipo de usuario
            localStorage.setItem('user_type', tipo.toString());
            console.log('Tipo de usuario guardado:', tipo);
            const targetRoute = tipo === 0 ? '/client/dashboard' : '/admin/dashboard';
            console.log('Navegando a:', targetRoute);

            // Usar window.location para navegación más robusta y asegurar limpieza de estados
            window.location.href = targetRoute;

            return { success: true };

        } catch (err) {
            const axiosError = err as AxiosError<{ detail?: string }>;
            const errorMessage = axiosError.response?.data?.detail ||
                axiosError.message ||
                'Error al conectar con el servidor';
            setError(errorMessage);
            console.error('Error:', err);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        const refreshToken = Cookies.get('refresh_token');

        if (refreshToken) {
            try {
                await api.post(AUTH_URLS.LOGOUT, { refresh: refreshToken });
            } catch (err) {
                console.error('Error al cerrar sesión:', err);
            }
        }

        // Limpiar Cookies
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');

        // Limpiar localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('user_type');

        router.push('/');
    };

    const isAuthenticated = () => {
        return !!Cookies.get('access_token');
    };

    return {
        login,
        logout,
        isAuthenticated,
        loading,
        error,
        setError
    };
};
