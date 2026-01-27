// ============================================
// SERVICIOS - URLS
// ============================================

export const SERVICIOS_URLS = {
  // Áreas de servicio
  AREAS: '/api/area/',
  AREA_DETAIL: (id: number) => `/api/area/${id}/`,

  // Categorías de servicio
  CATEGORIAS: '/api/categoria/',
  CATEGORIA_DETAIL: (id: number) => `/api/categoria/${id}/`,

  // Servicios disponibles
  SERVICIOS_DISPONIBLES: '/api/servicios_disponibles/',
  SERVICIO_DISPONIBLE_DETAIL: (id: number) => `/api/servicios_disponibles/${id}/`,

  // Servicio
  SERVICIOS: '/api/servicio/',
  SERVICIO_DETAIL: (id: number) => `/api/servicio/${id}/`,
} as const