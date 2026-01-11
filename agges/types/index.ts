/**
 * Tipos globales de la aplicación (FRONTEND)
 * Para tipos que NO están relacionados directamente con la API.
 * Si es para UI, lógica del frontend, o no viene del backend, va aquí.
 */

import type { ReactNode } from 'react'

// ============================================
// TIPOS DE USUARIO Y ROLES
// ============================================

export type UserRole = 'admin' | 'client'

export type UserStatus = 'activo' | 'inactivo'

// Estado de autenticación (frontend)
export interface AuthState {
  user: Record<string, unknown> | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

// ============================================
// COMPONENTES
// ============================================

export interface NavItem {
  label: string
  href: string
  icon?: ReactNode
}

export interface LayoutProps {
  children: ReactNode
}

// ============================================
// FORMULARIOS
// ============================================

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'file' | 'date' | 'number'
  placeholder?: string
  required?: boolean
  options?: SelectOption[]
}

export interface SelectOption {
  value: string | number
  label: string
}

export interface ValidationError {
  field: string
  message: string
}

// ============================================
// ESTADOS DE CARGA
// ============================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// ============================================
// PAGINACIÓN
// ============================================

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

// ============================================
// FILTROS Y ORDENAMIENTO
// ============================================

export type SortOrder = 'asc' | 'desc'

export interface SortConfig {
  field: string
  order: SortOrder
}

export interface FilterConfig {
  [key: string]: unknown
}

// ============================================
// BÚSQUEDA Y PARÁMETROS (Frontend only)
// ============================================

export interface ClienteSearchParams {
  search?: string
  is_active?: boolean
  ordering?: string
  page?: number
  page_size?: number
}

export interface ArchivoSearchParams {
  search?: string
  tipo_archivo?: string
  is_public?: boolean
  ordering?: string
  page?: number
  page_size?: number
}

// Modelo extendido para uso interno del frontend
export interface ArchivoUploadDataExtended {
  archivo: File
  nombre?: string
  descripcion?: string
  compartir_con?: number[]
  is_public?: boolean
}

// ============================================
// NEXT.JS PAGE PROPS
// ============================================

export interface PageParams {
  [key: string]: string
}

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface PageProps {
  params: PageParams
  searchParams: SearchParams
}

// ============================================
// TIPOS DE TABLA
// ============================================

export interface TableColumn<T = Record<string, unknown>> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => ReactNode
}

export interface TableRow {
  id: string | number
  [key: string]: unknown
}

// ============================================
// NOTIFICACIONES / TOAST
// ============================================

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  duration?: number
}

// ============================================
// MODAL
// ============================================

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}
