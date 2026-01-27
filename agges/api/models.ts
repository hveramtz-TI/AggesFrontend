/**
 * Modelos e interfaces de la API (BACKEND)
 * Define la estructura de datos que vienen del/al backend
 * Si algo viene de la API o se envía a la API, va aquí.
 */

// ============================================
// AUTENTICACIÓN
// ============================================

export interface User {
  id: number
  email: string
  username: string
  first_name?: string | null
  last_name?: string | null
  is_staff?: boolean
  is_active: boolean
  date_joined: string
  rut?: string | null
  // Campos adicionales que pueden venir del login
  tipo_usuario?: number // 0: Usuario normal, 1: Admin (frontend only)
  perfil?: { [key: string]: unknown } | null // Perfil del usuario (puede ser null, frontend only)
}

export interface LoginCredentials {
  rut: string
  password: string
}

export interface TokenPair {
  access: string
  refresh: string
}

export interface LoginResponse {
  detail: string // Mensaje del backend (ej: "Login exitoso.")
  tokens: TokenPair
  user: User
}

export interface RegisterData {
  username: string
  email: string
  password: string
  password2: string // backend usa password2
  first_name: string
  last_name: string
  rut?: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  password: string
  password_confirm: string
}

export interface PasswordChange {
  old_password: string
  new_password: string
  new_password_confirm: string
}

// ============================================
// CLIENTES
// ============================================

// Respuesta de GET /api/getclients/ (UsuarioClienteReducidoSerializer)
export interface ClienteSimple {
  id: number
  username: string // source: username
  rut: string // source: email (en el serializer reducido)
}

export interface Cliente {
  id: number
  nombre: string
  apellido: string
  email: string
  rut: string
  telefono: string
  empresa?: string
  direccion?: string
  ciudad?: string
  region?: string
  is_active: boolean
  created_at: string
  updated_at: string
  created_by?: number
}

export interface ClienteCreateData {
  nombre: string
  apellido: string
  email: string
  rut: string
  telefono: string
  empresa?: string
  direccion?: string
  ciudad?: string
  region?: string
}

export interface ClienteUpdateData extends Partial<ClienteCreateData> {
  is_active?: boolean
}

export interface ClienteListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Cliente[]
}

// ============================================
// ARCHIVOS/DOCUMENTOS
// ============================================

// Movido a api/apps/documentos/models.ts

// ============================================
// COTIZACIONES
// ============================================

export interface Region {
  id: number
  nombre: string
  codigo: string
}

export interface Comuna {
  id: number
  region: number
  nombre: string
  codigo: string
}

export interface CotizacionItem {
  material: number
  submaterial?: number
  cantidad: number
  unidad: string
  precio_unitario: number
  subtotal: number
}

export interface Cotizacion {
  id: number
  cliente: number
  cliente_nombre?: string
  numero_cotizacion: string
  fecha: string
  fecha_vencimiento: string
  items: CotizacionItem[]
  subtotal: number
  iva: number
  total: number
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'vencida'
  notas?: string
  region: number
  comuna: number
  direccion_retiro: string
  created_by: number
  created_at: string
  updated_at: string
}

export interface CotizacionCreateData {
  cliente: number
  fecha_vencimiento: string
  items: Omit<CotizacionItem, 'precio_unitario' | 'subtotal'>[]
  region: number
  comuna: number
  direccion_retiro: string
  notas?: string
}

export interface CotizacionCalculoRequest {
  items: {
    material: number
    submaterial?: number
    cantidad: number
  }[]
  region: number
  comuna: number
}

export interface CotizacionCalculoResponse {
  items: CotizacionItem[]
  subtotal: number
  iva: number
  total: number
}

// ============================================
// PROYECTOS
// ============================================

export interface Proyecto {
  id: number
  nombre: string
  descripcion: string
  cliente_id: number
  fecha_inicio: string
  fecha_fin?: string
  estado: 'planificacion' | 'en_progreso' | 'completado' | 'cancelado'
  presupuesto?: number
  responsable?: string
  created_at: string
  updated_at: string
}

export interface ProyectoCreateData {
  nombre: string
  descripcion: string
  cliente_id: number
  fecha_inicio: string
  fecha_fin?: string
  presupuesto?: number
  responsable?: string
}
// ============================================
// DASHBOARD
// ============================================

export interface ClientDashboardStats {
  cotizaciones_activas: number
  documentos: number
  proyectos: number
  ultima_actividad?: string
}

export interface AdminDashboardStats {
  total_clientes: number
  cotizaciones_pendientes: number
  proyectos_activos: number
  documentos: number
  nuevos_clientes_mes: number
}

// ============================================
// RESPUESTAS GENÉRICAS
// ============================================

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiError {
  detail?: string
  message?: string
  errors?: Record<string, string[]>
}

export interface SuccessResponse {
  message: string
  data?: unknown
}
