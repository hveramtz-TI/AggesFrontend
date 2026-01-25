'use client'

import { useState, useMemo, useEffect } from 'react'
import { calcularPorcentajeMateriales, generarRegistrosTablaGestion } from '@/utils/residuosCalculos'
import {
    FaFileExport
} from 'react-icons/fa'
import mockResiduosData from '../../../../data/mockResiduosData.json'
import conversionMadera from '../../../../data/conversionMadera.json'
import Image from 'next/image'
import { FaTree } from "react-icons/fa";
import Conversion from './components/Conversion';
import Graficos from './components/Graficos';
import TableGestion from './components/TableGestion';
import HuellaStats from './components/HuellaStats';

import { useClientes } from '@/hooks/useClientes';
import { useMateriales } from '@/hooks/useMateriales';
import { useOrdenes } from '@/hooks/useOrdenes';
import type { ClienteSimple } from '@/api/models';
import type { Material } from '@/api/models';
import type { ListadoOrdenesCliente, ListadoServiciosOrdenesCliente } from '@/api/ordenes/models';


export default function GestionResiduosPage() {
    // Obtener datos de clientes y materiales con hooks
    const { getClientes } = useClientes();
    const { listMateriales } = useMateriales();
    const { listOrdenesByUsuario, loading: loadingOrdenes } = useOrdenes();
    const [totalPeso , setTotalPeso] = useState<number>(0);

    // Estado para clientes
    const [clientes, setClientes] = useState<ClienteSimple[]>([]);
    useEffect(() => {
        getClientes().then(setClientes).catch(() => setClientes([]));
    }, [getClientes]);

    // Estado para materiales
    const [materiales, setMateriales] = useState<Material[]>([]);
    useEffect(() => {
        listMateriales().then(setMateriales).catch(() => setMateriales([]));
    }, [listMateriales]);
    

    // Estado para conversión
    const [conversion, setConversion] = useState<string>('papel');
    // Buscar la fórmula de conversión para el material seleccionado
    const conversionData = conversionMadera.find(c => c.objeto === conversion);


    // Estado para empresa seleccionada
    const [empresaId, setEmpresaId] = useState<string>('');
    const empresaSeleccionada = useMemo(() => clientes.find(c => String(c.id) === empresaId), [empresaId, clientes]);

    // Estado para órdenes del cliente seleccionado
    const [ordenesCliente, setOrdenesCliente] = useState<ListadoOrdenesCliente[]>([]);

    useEffect(() => {
        if (empresaId) {
            listOrdenesByUsuario(Number(empresaId)).then(data => {
                setOrdenesCliente(data.ordenes || []);
                setTotalPeso(data.suma_total_peso || 0);
            });
        }
    }, [empresaId, listOrdenesByUsuario]);

    // Aplicar conversión a las órdenes del cliente
    // Aplica la conversión a cada servicio de cada orden
    const ordenesConvertidas = useMemo(() => {
        if (!conversionData || !ordenesCliente.length) return [];
        const match = conversionData.formula.match(/\*\s*([\d.]+)/);
        const factor = match ? Number(match[1]) : 1;
        return ordenesCliente.map(orden => ({
            ...orden,
            servicios: orden.servicios.map((servicio: ListadoServiciosOrdenesCliente) => ({
                ...servicio,
                conversion: servicio.peso ? servicio.peso * factor : null
            }))
        }));
    }, [ordenesCliente, conversionData]);

    const { stats, registros } = mockResiduosData

    const treatmentKeys = ['reuso', 'reparacion', 'enfardado', 'triturado', 'reciclaje', 'ecoCir', 'eliminacion'] as const
    const treatmentLabels = ['Reuso', 'Reparación', 'Enfardado', 'Triturado', 'Reciclaje', 'Eco Cir', 'Eliminación']

    // Calcular totales por Material (para el Pie Chart)
    const materialTotals = useMemo(() => {
        return registros.map(item => {
            let total = 0
            treatmentKeys.forEach(key => total += item[key])
            return total
        })
    }, [registros])

    // Calcular totales por Tratamiento (para el Bar Chart)
    const treatmentTotals = useMemo(() => {
        return treatmentKeys.map(key => {
            return registros.reduce((acc, item) => acc + item[key], 0)
        })
    }, [registros])



    // Función para calcular el porcentaje de aparición de cada material en las órdenes y servicios del cliente
    const listadoPorcentajeMateriales = useMemo(() => calcularPorcentajeMateriales(ordenesCliente, materiales), [ordenesCliente, materiales]);

    const registrosTablaGestion = useMemo(() => generarRegistrosTablaGestion(listadoPorcentajeMateriales, treatmentKeys as string[]), [listadoPorcentajeMateriales, treatmentKeys]);

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

    // Configuración Chart: Stacked Bar Chart por Tratamiento y Material
    const materialColors = [
        '#8c52ff', // Cartón
        '#ff914d', // Papel
        '#ffde59', // Plástico
        '#7ed957', // Metal
        '#38b6ff', // Vidrio
        '#ff5757', // Orgánico
        '#8c8c8c', // Escombro
        '#004aad'  // Otros
    ];

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

    const stackedBarData = useMemo(() => ({
        labels: treatmentLabels,
        datasets: registros.map((r, idx) => ({
            label: r.material,
            data: treatmentKeys.map(key => r[key]),
            backgroundColor: materialColors[idx % materialColors.length]
        }))
    }), [registros]);

    const stackedBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top', labels: { font: { size: 11 } } },
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
        <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
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
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md">
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


                {/* Stats Cards (Huellas) */}
                <HuellaStats
                  totalPeso={totalPeso}
                  calcularHuellaCarbono={calcularHuellaCarbono}
                  calcularHuellaEcologica={calcularHuellaEcologica}
                  calcularHuellaHidrica={calcularHuellaHidrica}
                />

                {/* Conversion selector */}
                <Conversion />

                {/* Main Charts Section (modularizado) */}
                <Graficos
                    listadoPorcentajeMateriales={listadoPorcentajeMateriales}
                    pieOptions={pieOptions}
                    stackedBarData={stackedBarData}
                    stackedBarOptions={stackedBarOptions}
                />

                {/* Table Section (modularizado) */}
                <TableGestion registros={registrosTablaGestion} treatmentKeys={treatmentKeys} treatmentLabels={treatmentLabels} />
                {/* Equivalente en árboles */}
                <div className="flex justify-end mt-6">

                </div>
            </div>
        </div>
    )
}
