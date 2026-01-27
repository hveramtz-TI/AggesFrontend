// ============================================
// DOCUMENTOS - URLS
// ============================================

export const ARCHIVOS_URLS = {
  LIST: '/api/documentos/',
  DETAIL: (id: number) => `/api/documentos/${id}/`,
  UPLOAD: '/api/documentos/',
  DOWNLOAD: (id: number) => `/api/documentos/${id}/descargar/`,
  EDIT: (id: number) => `/api/documentos/${id}/editar/`,
  DELETE: (id: number) => `/api/documentos/${id}/eliminar/`,
  SHARED: '/api/documentos/compartidos/',
  SHARE: (id: number) => `/api/documentos/${id}/compartir/`,
  UNSHARE: (id: number) => `/api/documentos/${id}/dejar_de_compartir/`,
} as const