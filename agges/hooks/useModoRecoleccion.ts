import { useState, useCallback } from 'react';
import api from '@/api/client';
import { MODORECOLECCION_URL } from '@/api/modorecoleccion/urls';

export function useModoRecoleccion() {
  const [loading, setLoading] = useState(false);

  const listModoRecoleccion = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(MODORECOLECCION_URL);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    loading,
    listModoRecoleccion,
  };
}

export default useModoRecoleccion;
