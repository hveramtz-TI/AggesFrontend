// ============================================
// MATERIALES - URLS
// ============================================

export const MATERIALES_URLS = {
  LIST: '/api/materiales/',
  SUBMATERIALES: (materialId: number) => `/api/materiales/${materialId}/submateriales/`,
} as const