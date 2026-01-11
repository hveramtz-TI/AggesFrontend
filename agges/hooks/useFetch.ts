import { useState, useEffect, useCallback } from 'react';
// TODO: Importar API cuando esté configurada
// import { api } from '@/api/api';
import { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook para peticiones HTTP con Axios
 * 
 * @example
 * const { data, loading, error, refetch } = useFetch<Cliente[]>('/api/clientes');
 */
export const useFetch = <T = any>(
    url: string,
    options?: AxiosRequestConfig
): UseFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Implementar con API configurada
            // const response = await api({
            //     url,
            //     method: options?.method || 'GET',
            //     ...options,
            // });
            // setData(response.data);

            console.log('Fetch:', url, options);
            throw new Error('API no configurada');

        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            
            if (axiosError.response) {
                // Error de respuesta del servidor
                setError(axiosError.response.data?.message || `Error ${axiosError.response.status}`);
            } else if (axiosError.request) {
                // No se recibió respuesta
                setError('No se pudo conectar con el servidor');
            } else {
                // Error al configurar la petición
                setError(axiosError.message || 'Error desconocido');
            }
        } finally {
            setLoading(false);
        }
    }, [url, JSON.stringify(options)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
