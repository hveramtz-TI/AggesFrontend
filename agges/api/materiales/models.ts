// ============================================
// MATERIALES - MODELOS
// ============================================

export interface Material {
  id: number;
  nombre: string;
}

export interface Submaterial {
  id: number;
  material: number; // FK a Material
  nombre: string;
}

export interface Elemento {
  id: number;
  submaterial: number; // FK a Submaterial
  nombre: string;
}