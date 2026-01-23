// ============================================
// USUARIOS - MODELOS
// ============================================

export interface Usuario {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
  rut?: string
  is_staff: boolean
  is_active: boolean
  date_joined: string
}