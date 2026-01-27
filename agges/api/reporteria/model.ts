export interface MaterialOrdenResiduos {
    idmaterial: number;
    peso: number;
    tipotratamiento_id: number | null;
}

export interface OrdenResiduos {
    numero: number;
    division_id: number;
    fecha: string; // formato YYYY-MM-DD
    materiales: MaterialOrdenResiduos[];
}

export interface GestionResiduosClienteResponse {
    ordenes: OrdenResiduos[];
}

