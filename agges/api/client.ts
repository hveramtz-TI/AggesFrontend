import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { AUTH_URLS } from './urls'

/**
 * Cliente API con Axios y refresh automático de tokens
 * 
 * USO:
 * import { api } from '@/api/client';
 * 
 * // GET request
 * const { data } = await api.get('/api/endpoint/');
 * 
 * // POST request
 * const { data } = await api.post('/api/endpoint/', { campo: 'valor' });
 */

// Configuración: Cambiar a true para usar el backend local
const IS_LOCAL = true

// URLs del backend
const LOCAL_API_URL = 'http://127.0.0.1:8000'
const PRODUCTION_API_URL = 'https://antofa-backend.fly.dev'

// Determinar URL a usar (cuando IS_LOCAL es false, ignora .env)
const API_URL = IS_LOCAL ? LOCAL_API_URL : PRODUCTION_API_URL

// Crear instancia de Axios
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Interceptor de Request
 * Agrega el token de autenticación a todas las peticiones
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Interceptor de Response
 * Maneja renovación automática de tokens y errores globales
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // Si es 401 y no hemos reintentado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = Cookies.get('refresh_token')

      if (!refreshToken) {
        // Limpiar tokens
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        localStorage.removeItem('user') // El usuario sigue en localStorage por ahora si no es sensible
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        // Refrescar token
        const { data } = await axios.post(`${API_URL}${AUTH_URLS.REFRESH_TOKEN}`, {
          refresh: refreshToken,
        })

        // Guardar nuevos tokens en cookies
        Cookies.set('access_token', data.access, { expires: 1, secure: true, sameSite: 'strict' })
        if (data.refresh) {
          Cookies.set('refresh_token', data.refresh, { expires: 7, secure: true, sameSite: 'strict' })
        }

        // Reintentar petición original con nuevo token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.access}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        // Si falla el refresh, cerrar sesión
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
