
import type { OrdenResiduos } from '@/api/reporteria/model';
import type { Material } from '@/api/materiales/models';
import type { ChartData } from 'chart.js';
import { GestionResiduosClienteResponse } from '@/api';

// Calcula el porcentaje de peso de cada material respecto al total de materiales en todas las órdenes
export function calcularPorcentajeMateriales(
    ordenesCliente: OrdenResiduos[],
    materiales: Material[]
): ChartData<'pie', number[], string> {
    if (!ordenesCliente.length || !materiales.length) {
        return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    }
    // Sumar el peso total por idmaterial
    const materialPeso: Record<number, number> = {};
    let totalPeso = 0;
    ordenesCliente.forEach(orden => {
        if (Array.isArray(orden.materiales)) {
            orden.materiales.forEach(mat => {
                if (mat.idmaterial != null && typeof mat.peso === 'number') {
                    materialPeso[mat.idmaterial] = (materialPeso[mat.idmaterial] || 0) + mat.peso;
                    totalPeso += mat.peso;
                }
            });
        }
    });
    const labels = materiales
        .filter(mat => materialPeso[mat.id])
        .map(mat => mat.nombre);
    const data = materiales
        .filter(mat => materialPeso[mat.id])
        .map(mat => Number(((materialPeso[mat.id] / totalPeso) * 100).toFixed(1)));
    const backgroundColor = [
        '#8c52ff', '#ff914d', '#ffde59', '#7ed957', '#38b6ff', '#ff5757', '#8c8c8c', '#004aad',
        '#b388ff', '#ffd6a5', '#fdffb6', '#caff70', '#a0c4ff', '#ffadad', '#bdbdbd', '#003366'
    ];
    return {
        labels,
        datasets: [{
            data,
            backgroundColor: backgroundColor.slice(0, labels.length),
            borderWidth: 0,
            hoverOffset: 4
        }]
    };
}

// Genera la matriz de materiales por tipo de tratamiento para la tabla
export function generarRegistrosTablaGestion(
    ordenesCliente: OrdenResiduos[],
    treatmentKeys: string[],
    materiales: Material[]
): { material: string; [key: string]: number | string }[] {
    if (!ordenesCliente.length || !treatmentKeys.length || !materiales.length) return [];
    // Para cada material, sumar el peso por cada tipo de tratamiento
    return materiales.map(mat => {
        const row: { material: string; [key: string]: number | string } = { material: mat.nombre };
        treatmentKeys.forEach(tk => {
            // Sumar el peso de este material con este tipo de tratamiento en todas las órdenes
            let suma = 0;
            ordenesCliente.forEach(orden => {
                orden.materiales.forEach(m => {
                    if (m.idmaterial === mat.id && String(m.tipotratamiento_id) === tk) {
                        suma += m.peso;
                    }
                });
            });
            row[tk] = suma;
        });
        return row;
    });
}