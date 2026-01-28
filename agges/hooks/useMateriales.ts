"use client"
import * as React from 'react';
import { useCallback } from 'react';
import api from '@/api/client'
import { MATERIALES_URLS } from '@/api/materiales'

type LoadingState = boolean

export function useMateriales() {
  const [loading, setLoading] = React.useState<LoadingState>(false)

  const listMateriales = React.useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get(MATERIALES_URLS.LIST)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    listMateriales,
  }
}

export default useMateriales
