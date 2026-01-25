// ============================================
// SERVICIOS - MODELOS
// ============================================

export interface AreaDeServicio {
  id: number;
  nombre: string;
}

export interface CategoriaDeServicio {
  id: number;
  areadeservicio: number; // FK a AreaDeServicio
  nombre: string;
  abreviatura: string;
}

export interface ServiciosDisponibles {
  id: number;
  categoriadeservicio: number; // FK a CategoriaDeServicio
  nombre: string;
  abreviatura: string;
}

export interface Servicio {
  id: number;
  serviciosdisponible: number; // FK a ServiciosDisponibles
  nombre: string;
  abreviatura: string;
  conjugacion: string;
}