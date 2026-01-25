// ============================================
// ÓRDENES - MODELOS
// ============================================

export interface Division {
  id: number;
  nombre: string;
}

export interface Orden {
  id: number;
  numero: number;
  fecha?: string; // DateField, puede ser null
  usuario: number; // FK a Usuario
  division?: number; // FK a Division, opcional
}

export interface OrdenServ {
  id: number;
  orden: number; // FK a Orden
  servicio: number; // FK a Servicio
  material?: number; // FK a Material, opcional
  submaterial?: number; // FK a Submaterial, opcional
  elemento?: number; // FK a Elemento, opcional
  modorecoleccion?: number; // FK a ModoRecoleccion, opcional
  tipotratamiento?: number; // FK a TipoTratamiento, opcional
  peso?: string; // Decimal, opcional
}

export interface OrdenServ {
  id: number;
  servicio: number; // FK to Servicio
  elemento?: number; // FK to Elemento, nullable
  orden: number; // FK to Orden
  peso_material?: number;
}

export interface OrdenDoc {
  id: number;
  orden: number; // FK to Orden
  usuario: number; // FK to Usuario
  documento: number; // FK to Documento
}

export interface ListadoOrdenesCliente
{
  numero_orden: string; // Número de la orden
  servicios: ListadoServiciosOrdenesCliente[]; // Listado de servicios asociados a la orden
}

export interface ListadoServiciosOrdenesCliente {
  id_material: number; // ID del material
  peso: number; // Peso del material
}