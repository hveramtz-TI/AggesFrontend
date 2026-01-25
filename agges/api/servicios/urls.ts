// ============================================
// SERVICIOS - URLS
// ============================================

export const SERVICIOS_URLS = {
  // Áreas de servicio
  AREAS: '/api/areadeservicio/',
  AREA_DETAIL: (id: number) => `/api/areadeservicio/${id}/`,

  // Categorías de servicio
  CATEGORIAS: '/api/categoriadeservicio/',
  CATEGORIA_DETAIL: (id: number) => `/api/categoriadeservicio/${id}/`,

  // Servicios disponibles
  SERVICIOS_DISPONIBLES: '/api/serviciosdisponible/',
  SERVICIO_DISPONIBLE_DETAIL: (id: number) => `/api/serviciosdisponible/${id}/`,

  // Servicio
  SERVICIOS: '/api/servicios/',
  SERVICIO_DETAIL: (id: number) => `/api/servicios/${id}/`,
} as const