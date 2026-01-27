// ============================================
// USUARIOS - URLS
// ============================================

export const USUARIOS_URLS = {
  LIST: '/api/usuarios/',
  DETAIL: (id: number) => `/api/usuarios/${id}/`,
  CREATE: '/api/usuarios/',
  UPDATE: (id: number) => `/api/usuarios/${id}/`,
  DELETE: (id: number) => `/api/usuarios/${id}/`,
  REGISTER: '/api/auth/registro/',
  LOGIN: '/api/auth/login/',
  LOGOUT: '/api/auth/logout/',
  ADMIN_CHANGE_PASSWORD: '/api/admin/cambiar-clave/',
  GET_CLIENTS: '/api/getclients/',
} as const