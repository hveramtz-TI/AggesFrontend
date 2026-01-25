
import { useState, useCallback } from 'react';
import api from '@/api/client';
import { ORDENES_URLS } from '@/api/ordenes/urls';

type LoadingState = boolean;

export function useOrdenes() {
  const [loading, setLoading] = useState<LoadingState>(false);

  const listOrdenes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(ORDENES_URLS.LIST);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrden = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(ORDENES_URLS.DETAIL(id));
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrden = useCallback(async (payload: object) => {
    setLoading(true);
    try {
      const { data } = await api.post(ORDENES_URLS.CREATE, payload);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrden = useCallback(async (id: number, payload: object) => {
    setLoading(true);
    try {
      const { data } = await api.put(ORDENES_URLS.UPDATE(id), payload);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrden = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.delete(ORDENES_URLS.DELETE(id));
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const listOrdenesByUsuario = useCallback(async (usuarioId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(ORDENES_URLS.BY_USUARIO(usuarioId));
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    listOrdenes,
    getOrden,
    createOrden,
    updateOrden,
    deleteOrden,
    listOrdenesByUsuario,
  };
}

export default useOrdenes;
