// ============================================
// USUARIOS - URLS
// ============================================

export const USUARIOS_URLS = {
  PROFILE: '/api/auth/profile/',
  LIST: '/api/usuarios/',
  DETAIL: (id: number) => `/api/usuarios/${id}/`,
  REGISTER: '/api/auth/registro/',
  LOGIN: '/api/auth/login/',
  LOGOUT: '/api/auth/logout/',
} as const