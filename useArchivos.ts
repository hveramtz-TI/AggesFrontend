"use client"
import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import type { Archivo, ArchivoListResponse, ArchivoUploadData } from '@/api';
import { api } from '@/api/client';
import { ARCHIVOS_URLS } from '@/api';

/**
 * Hook personalizado para gestión de archivos
 * 
 * Proporciona funciones para:
 * - Listar archivos compartidos
 * - Descargar archivos
 * - Subir nuevos archivos
 * - Eliminar archivos
 * - Compartir/Descompartir archivos con clientes
 */
export const useArchivos = () => {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtener lista de archivos compartidos
   */
  const getArchivosCompartidos = useCallback(async (): Promise<Archivo[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<ArchivoListResponse | Archivo[]>(ARCHIVOS_URLS.SHARED);
      // Si el backend devuelve un array directo, filtrar solo los que sean Archivo
      if (Array.isArray(data)) {
        // Filtra los elementos que tengan todas las propiedades requeridas de Archivo
        return (data as Archivo[]).filter(
          (item) =>
            typeof item === 'object' &&
            'archivo' in item &&
            'descripcion' in item &&
            'tamaño_bytes' in item &&
            'tipo_mime' in item
        );
      }
      // Si data.results existe, filtra igual
      if (Array.isArray((data as ArchivoListResponse).results)) {
        return ((data as ArchivoListResponse).results as Archivo[]).filter(
          (item) =>
            typeof item === 'object' &&
            'archivo' in item &&
            'descripcion' in item &&
            'tamaño_bytes' in item &&
            'tipo_mime' in item
        );
      }
      return [];
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al cargar archivos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtener todos los archivos (paginado)
   */
  const getArchivos = useCallback(async (page: number = 1): Promise<ArchivoListResponse> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<ArchivoListResponse | Archivo[]>(ARCHIVOS_URLS.LIST, {
        params: { page }
      });

      // Si el backend devuelve un array directo, convertirlo al formato esperado
      if (Array.isArray(data)) {
        return {
          count: data.length,
          next: null,
          previous: null,
          results: data
        };
      }

      return data;
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al cargar archivos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtener detalle de un archivo específico
   */
  const getArchivo = useCallback(async (id: number): Promise<Archivo | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Archivo>(ARCHIVOS_URLS.DETAIL(id));
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al obtener archivo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtener extensión desde tipo MIME
   */
  const getExtensionFromMime = (mimeType: string): string => {
    const mimeMap: Record<string, string> = {
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
      'application/vnd.ms-excel': '.xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
      'application/vnd.ms-powerpoint': '.ppt',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
      'text/plain': '.txt',
      'application/zip': '.zip',
      'video/mp4': '.mp4',
      'video/mpeg': '.mpeg',
    };
    return mimeMap[mimeType] || '';
  };

  /**
   * Descargar archivo
   * Crea un enlace temporal y descarga el archivo con su nombre original y extensión correcta
   */
  const downloadArchivo = useCallback(async (id: number, nombreArchivo: string, tipoMime?: string): Promise<void> => {
    setDownloading(true);
    setError(null);
    try {
      const { data } = await api.get(ARCHIVOS_URLS.DOWNLOAD(id), {
        responseType: 'blob',
      });

      // Asegurar que el nombre tenga extensión
      let nombreConExtension = nombreArchivo;
      if (tipoMime && !nombreArchivo.includes('.')) {
        const extension = getExtensionFromMime(tipoMime);
        if (extension) {
          nombreConExtension = `${nombreArchivo}${extension}`;
        }
      }

      // Crear URL temporal para el blob
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreConExtension);

      // Agregar al DOM, hacer clic y remover
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Liberar memoria
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al descargar archivo';
      setError(errorMessage);
      throw err;
    } finally {
      setDownloading(false);
    }
  }, [getExtensionFromMime]);


  /**
   * Subir nuevo archivo
   * @param file - Archivo a subir
   * @param nombreArchivo - Nombre del archivo (obligatorio)
   * @param descripcion - Descripción opcional del archivo
   * @param usuarioCompartido - ID del usuario con quien compartir (obligatorio para admin)
   * @param visibilidad - Si el archivo es visible para el cliente (opcional, default true)
   */
  const uploadArchivo = useCallback(async (
    file: File,
    nombreArchivo: string,
    descripcion?: string,
    usuarioCompartido?: number,
    visibilidad: boolean = true
  ): Promise<Archivo | null> => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('archivo', file);
      formData.append('nombre_archivo', nombreArchivo);
      if (descripcion) {
        formData.append('descripcion', descripcion);
      }
      if (usuarioCompartido) {
        formData.append('usuario_compartido', usuarioCompartido.toString());
      }
      if (typeof visibilidad === 'boolean') {
        formData.append('visibilidad', visibilidad ? 'true' : 'false');
      }
      const { data } = await api.post<Archivo>(ARCHIVOS_URLS.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al subir archivo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Eliminar archivo
   */
  const deleteArchivo = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(ARCHIVOS_URLS.DELETE(id));
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al eliminar archivo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Compartir archivo con usuarios
   */
  const shareArchivo = useCallback(async (id: number, usuarios: number[]): Promise<Archivo | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<Archivo>(ARCHIVOS_URLS.SHARE(id), { usuarios });
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al compartir archivo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Descompartir archivo con usuarios
   */
  const unshareArchivo = useCallback(async (id: number, usuarios: number[]): Promise<Archivo | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<Archivo>(ARCHIVOS_URLS.UNSHARE(id), { usuarios });
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al descompartir archivo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Editar archivo existente (solo admin)
   * @param id - ID del archivo
   * @param data - Datos a editar (nombre, descripcion, usuario_compartido, visibilidad)
   */
  const editArchivo = useCallback(async (
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
      usuario_compartido?: number;
      is_public?: boolean;
    }
  ): Promise<Archivo | null> => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      if (data.nombre) formData.append('nombre', data.nombre);
      if (data.descripcion) formData.append('descripcion', data.descripcion);
      if (data.usuario_compartido) formData.append('usuario_compartido', data.usuario_compartido.toString());
      if (typeof data.is_public === 'boolean') formData.append('visibilidad', data.is_public ? 'true' : 'false');
      const { data: resp } = await api.patch<Archivo>(ARCHIVOS_URLS.EDIT(id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return resp;
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        'Error al editar archivo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    downloading,
    error,
    setError,
    getArchivos,
    getArchivosCompartidos,
    getArchivo,
    downloadArchivo,
    uploadArchivo,
    editArchivo,
    deleteArchivo,
    shareArchivo,
    unshareArchivo,
  };
};
