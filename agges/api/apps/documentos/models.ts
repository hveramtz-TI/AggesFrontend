// ============================================
// DOCUMENTOS - MODELOS
// ============================================

export interface Archivo {
  id: number
  archivo_url: string
  tamaño_legible: string
  archivo: string
  nombre_archivo: string
  descripcion: string | null
  tamaño_bytes: number
  tipo_mime: string
  visibilidad: boolean
  fecha_carga?: string // Algunos endpoints usan fecha_carga
  fecha_subida?: string // Otros usan fecha_subida
  fecha_modificacion: string
  usuario_propietario: number
  usuario_compartido: number | null // ID del usuario o null si no está compartido
  nombre_usuario_compartido?: string // Nombre del usuario compartido (opcional)
}

export interface ArchivoUploadData {
  archivo: File
  descripcion?: string
  usuario_compartido?: number // Solo para admin, obligatorio
}

export interface ArchivoShareData {
  usuarios: number[]
}

export interface ArchivoListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Archivo[]
}