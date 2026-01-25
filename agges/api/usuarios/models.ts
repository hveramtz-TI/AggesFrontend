// ============================================
// USUARIOS - MODELOS
// ============================================

export interface Usuario {
  id: number;
  username: string;
  email: string;
  rut?: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}