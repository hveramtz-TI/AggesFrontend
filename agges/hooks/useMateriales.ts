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

  const getMaterial = React.useCallback(async (id: number) => {
    setLoading(true)
    try {
      const { data } = await api.get(MATERIALES_URLS.DETAIL(id))
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const createMaterial = React.useCallback(async (payload: object) => {
    setLoading(true)
    try {
      const { data } = await api.post(MATERIALES_URLS.CREATE, payload)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const updateMaterial = React.useCallback(async (id: number, payload: object) => {
    setLoading(true)
    try {
      const { data } = await api.put(MATERIALES_URLS.UPDATE(id), payload)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteMaterial = useCallback(async (id: number) => {
    setLoading(true)
    try {
      const { data } = await api.delete(MATERIALES_URLS.DELETE(id))
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const listSubmateriales = useCallback(async (materialId: number) => {
    setLoading(true)
    try {
      const { data } = await api.get(MATERIALES_URLS.SUBMATERIAL_DETAIL(materialId))
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const getSubmaterial = useCallback(async (id: number) => {
    setLoading(true)
    try {
      const { data } = await api.get(MATERIALES_URLS.SUBMATERIAL_DETAIL(id))
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  {/*const listElementosBySubmaterial = useCallback(async (submaterialId: number) => {
    setLoading(true)
    try {
      const { data } = await api.get(MATERIALES_URLS.ELEMENTOS_BY_SUBMATERIAL(submaterialId))
      return data
    } finally {
      setLoading(false)
    }
  }, [])*/}

  const getElemento = useCallback(async (id: number) => {
    setLoading(true)
    try {
      const { data } = await api.get(MATERIALES_URLS.ELEMENTO_DETAIL(id))
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    listMateriales,
    getMaterial,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    listSubmateriales,
    getSubmaterial,
    getElemento,
  }
}

export default useMateriales
