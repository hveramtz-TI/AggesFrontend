// ============================================
// USUARIOS - MODELOS
// ============================================

export interface Usuario {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  date_joined: string;
  rut?: string | null;
}

export interface UsuarioCliente {
  id: number;
  username: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  rut?: string | null;
}

export interface UsuarioClienteReducido {
  id: number;
  razonSocial: string; // source: username
  rut: string; // source: email
}

export interface RegistroUsuarioData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  rut?: string;
}

export interface AdminChangePasswordData {
  user_id: number;
  new_password: string;
}