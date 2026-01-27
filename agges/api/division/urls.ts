// ============================================
// DIVISIÓN - URLS
// ============================================

export const DIVISION_URLS = {
  LIST: '/api/divisiones/',
  DETAIL: (id: number) => `/api/divisiones/${id}/`,
  CREATE: '/api/divisiones/',
  UPDATE: (id: number) => `/api/divisiones/${id}/`,
  DELETE: (id: number) => `/api/divisiones/${id}/`,
} as const;
