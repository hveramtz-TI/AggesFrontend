// ============================================
// ÓRDENES - MODELOS
// ============================================

export interface Orden {
  id: number;
  numero: number;
  fecha?: string | null; // DateField, puede ser null
  usuario: number; // FK a Usuario
  division?: number | null; // FK a Division, opcional
  orden_servicios?: OrdenServ[]; // Relación con OrdenServ (read_only en serializer)
}

export interface OrdenServ {
  id: number;
  orden: number; // FK a Orden
  material?: number | null; // FK a Material, opcional
  submaterial?: number | null; // FK a Submaterial, opcional
  elemento?: number | null; // FK a Elemento, opcional
  servicio: number; // FK a Servicio (required)
  modorecoleccion?: number | null; // FK a ModoRecoleccion, opcional
  tipotratamiento?: number | null; // FK a TipoTratamiento, opcional
  peso?: string | null; // DecimalField(max_digits=12, decimal_places=3), opcional
}

// Respuesta de gestion-residuos-cliente
export interface GestionResiduosClienteResponse {
  ordenes: OrdenResiduos[];
}

export interface OrdenResiduos {
  numero: number;
  division_id: number | null;
  fecha: string | null; // ISO format
  materiales: MaterialPeso[];
}

export interface MaterialPeso {
  idmaterial: number;
  peso: number;
}