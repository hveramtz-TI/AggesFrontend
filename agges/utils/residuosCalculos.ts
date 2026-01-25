import type { ListadoOrdenesCliente } from '@/api/ordenes/models';
import type { Material } from '@/api/models';

export function calcularPorcentajeMateriales(ordenesCliente: ListadoOrdenesCliente[], materiales: Material[]) {
    if (!ordenesCliente.length || !materiales.length) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    const materialCount: Record<number, number> = {};
    let totalServicios = 0;
    ordenesCliente.forEach(orden => {
        orden.servicios.forEach(servicio => {
            if (servicio.id_material != null) {
                materialCount[servicio.id_material] = (materialCount[servicio.id_material] || 0) + 1;
                totalServicios++;
            }
        });
    });
    const labels = materiales
        .filter(mat => materialCount[mat.id])
        .map(mat => mat.nombre);
    const data = materiales
        .filter(mat => materialCount[mat.id])
        .map(mat => Number(((materialCount[mat.id] / totalServicios) * 100).toFixed(1)));
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

export function generarRegistrosTablaGestion(listadoPorcentajeMateriales: any, treatmentKeys: string[]) {
    if (!listadoPorcentajeMateriales.labels || !listadoPorcentajeMateriales.datasets?.[0]?.data) return [];
    return listadoPorcentajeMateriales.labels.map((nombre: string, idx: number) => {
        const total = Math.round(listadoPorcentajeMateriales.datasets[0].data[idx] * 10); // Escala ficticia
        const base = Math.floor(total / treatmentKeys.length);
        let resto = total - base * treatmentKeys.length;
        const row: Record<string, any> = { material: nombre };
        treatmentKeys.forEach((key, i) => {
            row[key] = base + (i < resto ? 1 : 0);
        });
        return row;
    });
}
