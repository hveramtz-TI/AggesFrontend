// ============================================
// ÓRDENES - URLS
// ============================================

export const ORDENES_URLS = {
  // Órdenes
  LIST: '/api/ordenes/',
  DETAIL: (id: number) => `/api/ordenes/${id}/`,
  CREATE: '/api/ordenes/',
  UPDATE: (id: number) => `/api/ordenes/${id}/`,
  DELETE: (id: number) => `/api/ordenes/${id}/`,

  // OrdenServ (servicios asociados a una orden)
  ORDEN_SERV_LIST: '/api/ordenserv/',
  ORDEN_SERV_DETAIL: (id: number) => `/api/ordenserv/${id}/`,
  ORDEN_SERV_BY_ORDEN: (ordenId: number) => `/api/ordenes/${ordenId}/servicios/`,
} as const;