// ============================================
// SERVICIOS - MODELOS
// ============================================

export interface AreaDeServicio {
  id: number
  nombre: string
}

export interface CategoriaDeServicio {
  id: number
  area_de_servicio: number // FK to AreaDeServicio
  nombre: string
  abreviatura: string
}

export interface ServiciosDisponibles {
  id: number
  categoria: number // FK to CategoriaDeServicio
  nombre: string
  abreviatura: string
}

export interface ServicioDB {
  id: number
  nombre: string
  abreviatura: string
  conjugacion?: string
  categoria: number // FK to CategoriaDeServicio
  servicio_disponible: number // FK to ServiciosDisponibles
}