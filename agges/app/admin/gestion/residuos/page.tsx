'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { calcularPorcentajeMateriales, generarRegistrosTablaGestion } from '@/utils/residuosCalculos'
import {
    FaFileExport
} from 'react-icons/fa'
import listamaterialesconveriones from '@/data/conversionMateriales.json';
import { exportOnlyConversionSection, exportToPDF } from '@/utils/exportUtils';
import Conversion from './components/Conversion';
import Graficos from './components/Graficos';
import TableGestion from './components/TableGestion';
import HuellaStats from './components/HuellaStats';
import Spinner from '@/components/Spinner';
import { useClientes } from '@/hooks/useClientes';
import { useMateriales } from '@/hooks/useMateriales';
import { useReporteria } from '@/hooks/useReporteria';
import { useTipoTratamiento } from '@/hooks/useTipoTratamiento'
import type { ClienteSimple } from '@/api/models';
import type { Material } from '@/api/materiales/index';
import type { OrdenResiduos } from '@/api/reporteria/model';


export default function GestionResiduosPage() {
    // Estado para controlar si se debe expandir todo en exportación
    const [expandAllConversion, setExpandAllConversion] = useState(false);
    // Exporta toda la página visible como PDF
    const exportarReporteCompleto = async () => {
        setExpandAllConversion(true);
        await new Promise(res => setTimeout(res, 50)); // Espera a que el DOM se actualice
        await exportToPDF('main-page-content', 'reporte-gestion-residuos');
        setExpandAllConversion(false);
    };
    // Obtener datos de clientes y materiales con hooks
    const { fetchGestionResiduosCliente } = useReporteria();
    const { getClientes } = useClientes();
    const { listMateriales } = useMateriales();
    const { listTipoTratamiento } = useTipoTratamiento();
    const [totalPeso , setTotalPeso] = useState<number>(0);

    // Estado para clientes
    const [clientes, setClientes] = useState<ClienteSimple[]>([]);
        useEffect(() => {
            getClientes().then(data => setClientes(data)).catch(() => setClientes([]));
        }, []);

    // Estado para materiales
    const [materiales, setMateriales] = useState<Material[]>([]);
        useEffect(() => {
            listMateriales().then(data => setMateriales(data)).catch(() => setMateriales([]));
        }, []);

    const [tipoTratamientos, setTipoTratamientos] = useState<any[]>([]);
        useEffect(() => {
            listTipoTratamiento().then(data => setTipoTratamientos(data)).catch(() => setTipoTratamientos([]));
        }, []);

    // Estado para conversión
    const [conversion, setConversion] = useState<string>('papel');
    // Buscar la fórmula de conversión para el material seleccionado
    const conversionData = listamaterialesconveriones.find(c => c.id === parseInt(conversion));


    // Estado para empresa seleccionada
    const [empresaId, setEmpresaId] = useState<string>('');
    const empresaSeleccionada = useMemo(() => clientes.find(c => String(c.id) === empresaId), [empresaId, clientes]);

    // Estado para órdenes del cliente seleccionado (de la API de reportería)
    const [ordenesCliente, setOrdenesCliente] = useState<OrdenResiduos[]>([]);
    const [registrosGestion, setRegistrosGestion] = useState<any[]>([]);

    // Preparar props para la tabla de gestión
    const treatmentKeys = tipoTratamientos.map(tt => String(tt.id));
    const treatmentLabels = tipoTratamientos.map(tt => tt.nombre);
    const registrosTablaGestion = useMemo(() => {
        return generarRegistrosTablaGestion(ordenesCliente, treatmentKeys, materiales);
    }, [ordenesCliente, materiales, treatmentKeys]);
    const [loading, setLoading] = useState(false);
    const listadoPorcentajeMateriales = calcularPorcentajeMateriales(ordenesCliente, materiales);

    // --- Generar datos para el gráfico de barras apiladas ---
    // Eje X: materiales, series: tipos de tratamiento, valores: suma de peso
    const stackedBarData = useMemo(() => {
        if (!materiales.length || !tipoTratamientos.length || !ordenesCliente.length) return { labels: [], datasets: [] };
        const labels = materiales.map(m => m.nombre);
        // Para cada tipo de tratamiento, sumar el peso por material
        const datasets = tipoTratamientos.map((tt: any, idx: number) => {
            const data = materiales.map(mat => {
                // Sumar el peso de este material con este tipo de tratamiento en todas las órdenes
                let suma = 0;
                ordenesCliente.forEach(orden => {
                    orden.materiales.forEach(m => {
                        if (m.idmaterial === mat.id && m.tipotratamiento_id === tt.id) {
                            suma += m.peso;
                        }
                    });
                });
                return suma;
            });
            // Colores base
            const colores = [
                '#8c52ff', '#ff914d', '#ffde59', '#7ed957', '#38b6ff', '#ff5757', '#8c8c8c', '#004aad',
                '#b388ff', '#ffd6a5', '#fdffb6', '#caff70', '#a0c4ff', '#ffadad', '#bdbdbd', '#003366'
            ];
            return {
                label: tt.nombre,
                data,
                backgroundColor: colores[idx % colores.length],
                stack: 'Stack 0',
            };
        });
        return { labels, datasets };
    }, [materiales, tipoTratamientos, ordenesCliente]);
    useEffect(() => {
        let active = true;
        if (empresaId) {
            setLoading(true);
            fetchGestionResiduosCliente(Number(empresaId)).then(data => {
                if (!active) return;
                if (data) {
                    setOrdenesCliente(data.ordenes || []);
                    // Calcular el total de peso sumando todos los materiales de todas las órdenes
                    const total = (data.ordenes || []).reduce((acc: number, orden: any) => {
                        return acc + (orden.materiales?.reduce((a: number, m: any) => a + (m.peso || 0), 0) || 0);
                    }, 0);
                    setTotalPeso(total);
                    // Generar registros para la tabla y gráficos
                    setRegistrosGestion(data.ordenes || []);
                } else {
                    setOrdenesCliente([]);
                    setTotalPeso(0);
                    setRegistrosGestion([]);
                }
                setLoading(false);
            }).catch(() => {
                if (!active) return;
                setOrdenesCliente([]);
                setTotalPeso(0);
                setRegistrosGestion([]);
                setLoading(false);
            });
        } else {
            setOrdenesCliente([]);
            setTotalPeso(0);
            setRegistrosGestion([]);
        }
        return () => { active = false; };
    }, [empresaId, fetchGestionResiduosCliente]);

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    boxWidth: 12,
                    font: { size: 11 },
                    usePointStyle: true,
                    // Mostrar porcentaje en la leyenda
                    generateLabels: (chart: any) => {
                        const data = chart.data;
                        if (!data.labels || !data.datasets.length) return [];
                        const dataset = data.datasets[0];
                        const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
                        return data.labels.map((label: string, i: number) => {
                            const value = dataset.data[i];
                            const percent = total ? ((value / total) * 100).toFixed(1) : 0;
                            return {
                                text: `${label} (${percent}%)`,
                                fillStyle: dataset.backgroundColor[i],
                                strokeStyle: dataset.backgroundColor[i],
                                index: i
                            };
                        });
                    }
                }
            },
            title: {
                display: true,
                text: '% Órdenes por Material'
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percent = total ? ((value / total) * 100).toFixed(1) : 0;
                        return `${label}: ${value}%`;
                    }
                }
            }
        }
    }

    // --- FUNCIONES DE CÁLCULO DE HUELLAS ---
    // Puedes ajustar los factores según la lógica real de negocio
    function calcularHuellaCarbono(totalPesoKg: number) {
        // Ejemplo: 1 kg = 1.8 kg CO2 evitado
        const valor = (totalPesoKg * 1.8).toFixed(1);
        // Ejemplo: cada 18 kg CO2 = 1 árbol salvado
        const arboles = Math.round((totalPesoKg * 1.8) / 18);
        return {
            valor,
            unidad: 'kg CO₂',
            arboles
        };
    }

    function calcularHuellaEcologica(totalPesoKg: number) {
        // Ejemplo: 1 kg = 0.05 m² recuperados
        const valor = (totalPesoKg * 0.05).toFixed(1);
        return {
            valor,
            unidad: 'm²',
            superficie: Math.round(totalPesoKg * 0.05)
        };
    }

    function calcularHuellaHidrica(totalPesoKg: number) {
        // Ejemplo: 1 kg = 2 litros de agua ahorrados
        const valor = (totalPesoKg * 2).toFixed(0);
        return {
            valor,
            unidad: 'L',
            agua: Number(valor)
        };
    }

    const stackedBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top' as const, labels: { font: { size: 11 } } },
            title: {
                display: true,
                text: 'Volumen por Tipo de Tratamiento y Material'
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: { font: { size: 11 }, color: '#6b7280' },
                border: { display: false }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: { color: '#f3f4f6' },
                ticks: { font: { size: 10 }, color: '#9ca3af' },
                border: { display: false }
            }
        }
    }

    return (
        <div className="min-h-screen p-4 sm:p-8 relative">
            {/* Overlay de carga */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <Spinner />
                </div>
            )}
            <div className="max-w-7xl mx-auto" id="main-page-content">
                {/* Banner superior con logo de empresa seleccionada */}
                {/*<div className='w-full h-20 bg-amber-50 shadow-md rounded-lg mb-6 overflow-hidden'>
                    <div className='w-full h-full relative flex items-center justify-center'>
                        {empresaSeleccionada && empresaSeleccionada.logo ? (
                            <Image
                                src={empresaSeleccionada.logo}
                                alt={empresaSeleccionada.username}
                                fill
                                className="object-contain object-center"
                                style={{ background: 'white' }}
                            />
                        ) : (
                            <Image
                                src="/logo.webp"
                                alt="Banner Residuos"
                                fill
                                className="object-cover object-center"
                            />
                        )}
                    </div>
                </div>*/}
                {/* Header */}
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Gestión de Residuos</h1>
                        <p className="text-gray-500 font-medium">Monitoreo de impacto ambiental y recuperación de materiales</p>
                    </div>
                    <button
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md"
                        onClick={exportarReporteCompleto}
                    >
                        <FaFileExport />
                        <span>Exportar Reporte</span>
                    </button>
                </header>
                {/* Filtros superiores */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col md:flex-row md:items-end gap-4">
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label className="text-xs font-semibold text-gray-500">Nombre Empresa</label>
                        <select
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={empresaId}
                            onChange={e => setEmpresaId(e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>{cliente.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label className="text-xs font-semibold text-gray-500">División</label>
                        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                            <option value="">Seleccionar</option>
                            <option value="Norte">Norte</option>
                            <option value="Centro">Centro</option>
                            <option value="Sur">Sur</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label className="text-xs font-semibold text-gray-500">Año</label>
                        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                            <option value="">Seleccionar</option>
                            {Array.from({ length: 6 }, (_, i) => 2025 - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label className="text-xs font-semibold text-gray-500">Mes</label>
                        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                            <option value="">Seleccionar</option>
                            {["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"].map((mes, idx) => (
                                <option key={mes} value={idx+1}>{mes}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label className="text-xs font-semibold text-gray-500">N° Orden</label>
                        <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="N° Orden" min="1" />
                    </div>
                </div>

                    <HuellaStats
                    totalPeso={totalPeso}
                    calcularHuellaCarbono={calcularHuellaCarbono}
                    calcularHuellaEcologica={calcularHuellaEcologica}
                    calcularHuellaHidrica={calcularHuellaHidrica}
                    />
                    <div id="conversion-section">
                        <Conversion expandAll={expandAllConversion} />
                    </div>
                    
                    <Graficos
                        listadoPorcentajeMateriales={listadoPorcentajeMateriales}
                        pieOptions={pieOptions}
                        stackedBarData={stackedBarData}
                        stackedBarOptions={stackedBarOptions}
                    />


                    <TableGestion
                        registros={registrosTablaGestion}
                        treatmentKeys={treatmentKeys}
                        treatmentLabels={treatmentLabels}
                    />
            </div>
        </div>
    )
}
