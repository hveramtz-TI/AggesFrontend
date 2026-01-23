// ============================================
// MATERIALES - MODELOS
// ============================================

export interface MaterialDB {
  id: number
  nombre: string
}

export interface SubmaterialDB {
  id: number
  material: number // FK to Material
  nombre: string
}

export interface Elemento {
  id: number
  submaterial: number // FK to Submaterial
  nombre: string
}