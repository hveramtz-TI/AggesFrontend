// ============================================
// DOCUMENTOS - MODELOS
// ============================================

// DocumentoSerializer completo (para detalle)
export interface Archivo {
  id: number
  archivo_url?: string // SerializerMethodField
  tamaño_legible?: string // SerializerMethodField
  archivo: string // FileField
  nombre_archivo: string
  descripcion: string | null
  tamaño_bytes: number
  tipo_mime: string
  visibilidad: boolean
  fecha_carga: string // DateTimeField auto_now_add
  fecha_modificacion: string // DateTimeField auto_now
  usuario_propietario: number // FK
  usuario_compartido: number | null // FK, nullable
  nombre_usuario_compartido?: string // SerializerMethodField (username del usuario_compartido)
}

// DocumentoReducidoSerializer (para listado)
export interface ArchivoReducido {
  id: number
  nombre_archivo: string
  fecha_carga: string // formato: "YYYY-MM-DD HH:MM"
  usuario_compartido_nombre: string | null // username del usuario compartido
}

// DocumentoCreateSerializer (para crear)
export interface ArchivoUploadData {
  archivo: File
  nombre_archivo?: string
  descripcion?: string
  tipo_mime?: string
  // usuario_compartido se agrega automáticamente según el tipo de usuario
}

// DocumentoCompartirSerializer (para compartir)
export interface ArchivoShareData {
  usuario_id: number
}

// DocumentoUpdateSerializer (para actualizar)
export interface ArchivoUpdateData {
  nombre_archivo?: string
  usuario_compartido?: number | null
  descripcion?: string
  visibilidad?: boolean
}

export interface ArchivoListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Archivo[] | ArchivoReducido[]
}