// ============================================
// MATERIALES - URLS
// ============================================

export const MATERIALES_URLS = {
  // Materiales
  LIST: '/api/materiales/',
  DETAIL: (id: number) => `/api/materiales/${id}/`,
  CREATE: '/api/materiales/',
  UPDATE: (id: number) => `/api/materiales/${id}/`,
  DELETE: (id: number) => `/api/materiales/${id}/`,

  // Submateriales
  SUBMATERIALES: '/api/submateriales/',
  SUBMATERIAL_DETAIL: (id: number) => `/api/submateriales/${id}/`,

  // Elementos
  ELEMENTOS: '/api/elementos/',
  ELEMENTO_DETAIL: (id: number) => `/api/elementos/${id}/`,
} as const