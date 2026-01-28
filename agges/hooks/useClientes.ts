"use client"
import * as React from 'react';
import { AxiosError } from 'axios';
import type { ClienteSimple } from '@/api';
import { api } from '@/api/client';
import { CLIENTES_URLS } from '@/api';

/**
 * Hook personalizado para gestión de clientes
 * 
 * Proporciona funciones para:
 * - Obtener lista de clientes (usuarios no-admin)
 */
export const useClientes = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  /**
   * Obtener lista de clientes (usuarios no-admin)
   * GET /api/getclients/
   * Retorna: { "id": int, "razonSocial": string, "rut": string }
   * - razonSocial viene del campo username
   * - rut viene del campo email
   */
  const getClientes = React.useCallback(async (): Promise<ClienteSimple[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<ClienteSimple[]>(CLIENTES_URLS.LIST);
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail || 
                          axiosError.response?.data?.message || 
                          'Error al cargar clientes';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    setError,
    getClientes,
  };
};
