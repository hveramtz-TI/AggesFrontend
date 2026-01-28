
"use client"
import * as React from 'react';
import api from '@/api/client';
import { ORDENES_URLS } from '@/api/ordenes/urls';
import { REPORTERIA_URLS } from '@/api/reporteria/urls';
import type { GestionResiduosClienteResponse } from '@/api/ordenes/models';

type LoadingState = boolean;

export function useOrdenes() {
  const [loading, setLoading] = React.useState<LoadingState>(false);

  const listOrdenes = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(ORDENES_URLS.LIST);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrden = React.useCallback(async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(ORDENES_URLS.DETAIL(id));
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrden = React.useCallback(async (payload: object) => {
    setLoading(true);
    try {
      const { data } = await api.post(ORDENES_URLS.CREATE, payload);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrden = React.useCallback(async (id: number, payload: object) => {
    setLoading(true);
    try {
      const { data } = await api.put(ORDENES_URLS.UPDATE(id), payload);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrden = React.useCallback(async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.delete(ORDENES_URLS.DELETE(id));
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  // Gestión de residuos por cliente (usando reportería)
  const gestionResiduosCliente = React.useCallback(async (usuarioId: number): Promise<GestionResiduosClienteResponse> => {
    setLoading(true);
    try {
      const { data } = await api.get<GestionResiduosClienteResponse>(REPORTERIA_URLS.getGestionResiduosCliente(usuarioId));
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
    gestionResiduosCliente,
  };
}

export default useOrdenes;
