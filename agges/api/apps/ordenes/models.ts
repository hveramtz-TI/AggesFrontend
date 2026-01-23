// ============================================
// ÓRDENES - MODELOS
// ============================================

export interface ModoRecoleccion {
  id: number
  nombre: string
}

export interface Division {
  id: number
  nombre: string
}

export interface Orden {
  id: number
  numero: number
  fecha?: string // DateField, puede ser null
  usuario: number // FK to Usuario
  division?: number // FK to Division, nullable
  servicio?: number // FK to Servicio, nullable
  material?: number // FK to Material, nullable
  submaterial?: number // FK to Submaterial, nullable
  elemento?: number // FK to Elemento, nullable
  modo_recoleccion?: number // FK to ModoRecoleccion, nullable
  correlacion: string
  documento_comercial?: number // FK to Documento, nullable
  fecha_creacion: string
}

export interface OrdenServ {
  id: number
  servicio: number // FK to Servicio
  elemento?: number // FK to Elemento, nullable
  orden: number // FK to Orden
  peso_material?: number
}

export interface OrdenDoc {
  id: number
  orden: number // FK to Orden
  usuario: number // FK to Usuario
  documento: number // FK to Documento
}