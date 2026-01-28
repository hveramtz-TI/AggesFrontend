"use client"

import * as React from 'react';
import api from '@/api/client';
import { TIPOTRATAMIENTO_URL } from '@/api/tipotratamiento/urls';

export function useTipoTratamiento() {
  const [loading, setLoading] = React.useState(false);

  const listTipoTratamiento = React.useCallback(async () => {
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
