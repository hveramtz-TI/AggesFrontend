/**
 * URLs de los endpoints del backend
 * Centraliza todas las rutas de la API
 * Actualizado según backend/config/urls.py
 */

// Base URL para los endpoints del backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// ============================================
// AUTENTICACIÓN
// ============================================
export const AUTH_URLS = {
  TOKEN_OBTAIN: '/api/token/',
  TOKEN_REFRESH: '/api/token/refresh/',
  PASSWORD_RESET: '/api/password_reset/',
  ADMIN_CHANGE_PASSWORD: '/api/admin/cambiar-clave/',
} as const

// ============================================
// CLIENTES
// ============================================
// export const CLIENTES_URLS = {
//   // GET - Lista de clientes (usuarios no-admin)
//   LIST: '/api/getclients/',
// } as const

// ============================================
// DIVISIÓN
// ============================================


// ============================================
// DOCUMENTACIÓN API
// ============================================
export const API_DOCS_URLS = {
  SCHEMA: '/api/schema/',
  SWAGGER: '/api/docs/',
} as const
