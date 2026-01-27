
import { useCallback } from 'react';
import { REPORTERIA_URLS } from '@/api/reporteria/urls';
import { api } from '@/api/client';

export function useReporteria() {
  // Hook para obtener la gestión de residuos de un cliente usando Axios
  const fetchGestionResiduosCliente = useCallback(async (usuarioId: number) => {
    try {
      const { data } = await api.get(REPORTERIA_URLS.getGestionResiduosCliente(usuarioId));
      return data;
    } catch (error) {
      console.error('Error al obtener gestión de residuos:', error);
      return null;
    }
  }, []);

  return {
    fetchGestionResiduosCliente,
  };
}
