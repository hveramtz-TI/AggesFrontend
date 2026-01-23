/**
 * URLs de los endpoints del backend
 * Centraliza todas las rutas de la API
 */

// ============================================
// AUTENTICACIÓN
// ============================================
export const AUTH_URLS = {
  LOGIN: '/api/auth/login/',
  LOGOUT: '/api/auth/logout/',
  REFRESH_TOKEN: '/api/token/refresh/',
  VERIFY_TOKEN: '/api/token/verify/',
  REGISTER: '/api/auth/register/',
  PASSWORD_RESET: '/api/auth/password/reset/',
  PASSWORD_RESET_CONFIRM: '/api/auth/password/reset/confirm/',
  CHANGE_PASSWORD: '/api/auth/password/change/',
  PROFILE: '/api/auth/profile/',
} as const

// ============================================
// CLIENTES
// ============================================
export const CLIENTES_URLS = {
  // GET - Lista de clientes (usuarios no-admin)
  LIST: '/api/getclients/',
  DETAIL: (id: number) => `/api/clientes/${id}/`,
  CREATE: '/api/clientes/',
  UPDATE: (id: number) => `/api/clientes/${id}/`,
  DELETE: (id: number) => `/api/clientes/${id}/`,
  TOGGLE_ACTIVE: (id: number) => `/api/clientes/${id}/toggle-active/`,
  SEARCH: '/api/clientes/search/',
  EXPORT: '/api/clientes/export/',
} as const

// ============================================
// ARCHIVOS/DOCUMENTOS
// ============================================

// Movido a api/apps/documentos/urls.ts

// ============================================
// COTIZACIONES
// ============================================
export const COTIZACIONES_URLS = {
  LIST: '/api/cotizaciones/',
  DETAIL: (id: number) => `/api/cotizaciones/${id}/`,
  CREATE: '/api/cotizaciones/',
  UPDATE: (id: number) => `/api/cotizaciones/${id}/`,
  DELETE: (id: number) => `/api/cotizaciones/${id}/`,
  MATERIALES: '/api/materiales/',
  SUBMATERIALES: (materialId: number) => `/api/materiales/${materialId}/submateriales/`,
  REGIONES: '/api/regiones/',
  COMUNAS: (regionId: number) => `/api/regiones/${regionId}/comunas/`,
  CALCULAR: '/api/cotizaciones/calcular/',
  EXPORT_PDF: (id: number) => `/api/cotizaciones/${id}/export-pdf/`,
} as const

// ============================================
// PROYECTOS
// ============================================
export const PROYECTOS_URLS = {
  LIST: '/api/proyectos/',
  DETAIL: (id: number) => `/api/proyectos/${id}/`,
  CREATE: '/api/proyectos/',
  UPDATE: (id: number) => `/api/proyectos/${id}/`,
  DELETE: (id: number) => `/api/proyectos/${id}/`,
} as const

// ============================================
// DASHBOARD / ESTADÍSTICAS
// ============================================
export const DASHBOARD_URLS = {
  CLIENT_STATS: '/api/dashboard/client/',
  ADMIN_STATS: '/api/dashboard/admin/',
} as const
