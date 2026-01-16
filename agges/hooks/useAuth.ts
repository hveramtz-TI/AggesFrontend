import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { api } from '@/api/client';
import { AUTH_URLS } from '@/api/urls';
import type { LoginCredentials, LoginResponse } from '@/api/models';

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

            // Guardar tokens JWT
            if (data.tokens) {
                localStorage.setItem('access_token', data.tokens.access);
                localStorage.setItem('refresh_token', data.tokens.refresh);
                console.log('Tokens guardados correctamente');
            }

            // Guardar información del usuario
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log('Usuario guardado:', data.user);
            }

            // Navegar según el tipo de usuario
            localStorage.setItem('user_type', tipo.toString());
            console.log('Tipo de usuario guardado:', tipo);
            const targetRoute = tipo === 0 ? '/client/dashboard' : '/admin/dashboard';
            console.log('Navegando a:', targetRoute);
            
            // Usar window.location para navegación más robusta
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
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (refreshToken) {
            try {
                await api.post(AUTH_URLS.LOGOUT, { refresh: refreshToken });
            } catch (err) {
                console.error('Error al cerrar sesión:', err);
            }
        }

        // Limpiar localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        
        router.push('/');
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('access_token');
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
