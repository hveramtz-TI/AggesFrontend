"use client"
import * as React from 'react';
import api from '@/api/client';
import { MODORECOLECCION_URL } from '@/api/modorecoleccion/urls';

export function useModoRecoleccion() {
  const [loading, setLoading] = React.useState(false);

  const listModoRecoleccion = React.useCallback(async () => {
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
