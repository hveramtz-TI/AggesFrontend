import { useState, useCallback } from 'react';
import api from '@/api/client';
import { TIPOTRATAMIENTO_URL } from '@/api/tipotratamiento/urls';

export function useTipoTratamiento() {
  const [loading, setLoading] = useState(false);

  const listTipoTratamiento = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(TIPOTRATAMIENTO_URL);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    loading,
    listTipoTratamiento,
  };
}

export default useTipoTratamiento;
