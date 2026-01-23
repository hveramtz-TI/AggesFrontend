'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
    FaRecycle,
    FaLeaf,
    FaTint,
    FaGlobeAmericas,
    FaFileExport
} from 'react-icons/fa'
import mockResiduosData from '../../../../data/mockResiduosData.json'
import clientesData from '../../../../data/clientes.json'
import conversionMadera from '../../../../data/conversionMadera.json'
import Image from 'next/image'
import { FaTree } from "react-icons/fa";
import Conversion from './components/Conversion';

const Chart = dynamic(() => import('../../../../components/Chart'), { ssr: false })

export default function GestionResiduosPage() {
    // Estado para conversión
    const [conversion, setConversion] = useState('papel');
    const conversionData = conversionMadera.find(c => c.objeto === conversion);


    // Estado para empresa seleccionada
    const [empresaId, setEmpresaId] = useState<string>('');
    const clientes = clientesData as { id: number; name: string; logo: string }[];
    const empresaSeleccionada = useMemo(() => clientes.find(c => String(c.id) === empresaId), [empresaId, clientes]);

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


    // Configuración Chart: Distribución por Material
    const pieData = useMemo(() => ({
        labels: registros.map(r => r.material),
        datasets: [{
            data: materialTotals,
            backgroundColor: [
                '#8c52ff', // Cartón
                '#ff914d', // Papel
                '#ffde59', // Plástico
                '#7ed957', // Metal
                '#38b6ff', // Vidrio
                '#ff5757', // Orgánico
                '#8c8c8c', // Escombro
                '#004aad'  // Otros
            ],
            borderWidth: 0,
            hoverOffset: 4
        }]
    }), [registros, materialTotals])

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: { boxWidth: 12, font: { size: 11 }, usePointStyle: true }
            },
            title: {
                display: true,
                text: 'Total Kilos por Material'
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
                <div className='w-full h-20 bg-amber-50 shadow-md rounded-lg mb-6 overflow-hidden'>
                    <div className='w-full h-full relative flex items-center justify-center'>
                        {empresaSeleccionada && empresaSeleccionada.logo ? (
                            <Image
                                src={empresaSeleccionada.logo}
                                alt={empresaSeleccionada.name}
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
                </div>
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
                                <option key={cliente.id} value={cliente.id}>{cliente.name}</option>
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
                        <label className="text-xs font-semibold text-gray-500">RUT Administrador</label>
                        <input type="text" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Ej: 12.345.678-9" />
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
                        <label className="text-xs font-semibold text-gray-500">N° Servicio</label>
                        <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="N° Servicio" min="1" />
                    </div>
                </div>


                {/* Stats Cards (Huellas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Impacto Ambiental</p>
                            <h3 className="text-2xl font-extrabold text-gray-800">Huella de Carbono</h3>
                            <p className="text-sm text-green-500 font-semibold mt-1">{stats.huellaCarbono.valor} {stats.huellaCarbono.unidad} <span className="text-xs text-gray-400">({stats.huellaCarbono.cambio})</span></p>
                            <span className="inline-flex items-center gap-2 text-green-700 font-semibold bg-green-50 rounded-lg px-4 py-2 text-sm shadow-sm">
                                <FaTree className="text-green-500" />
                                Equivale a 120 árboles salvados
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xl">
                            <FaLeaf />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Sostenibilidad</p>
                            <h3 className="text-2xl font-extrabold text-gray-800">Huella Ecológica</h3>
                            <p className="text-sm text-blue-500 font-semibold mt-1">{stats.huellaEcologica.valor} {stats.huellaEcologica.unidad}</p>
                            <span className="inline-flex items-center gap-2 text-blue-700 font-semibold bg-stone-500 rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
                                <FaGlobeAmericas className="text-blue-500" />
                                <span className="text-stone-800">Superficie recuperada: 80 m²</span>
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl">
                            <FaGlobeAmericas />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Recursos Hídricos</p>
                            <h3 className="text-2xl font-extrabold text-gray-800">Huella Hídrica</h3>
                            <p className="text-sm text-blue-500 font-semibold mt-1">{stats.huellaHidrica.valor} {stats.huellaHidrica.unidad}</p>
                            <span className="inline-flex items-center gap-2 text-blue-700 font-semibold bg-blue-50 rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
                                <FaTint className="text-blue-500" />
                                Agua ahorrada: 1,200 L
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl">
                            <FaTint />
                        </div>
                    </div>
                </div>

                {/* Conversion selector */}
                <Conversion />

                {/* Main Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Distribución por Material (Pie) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Distribución Total (Kg)</h3>
                        <div className="h-[280px] relative">
                            <Chart type="pie" data={pieData} options={pieOptions} />
                        </div>
                    </div>

                    {/* Stacked Bar Chart por Tratamiento y Material */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Materiales por Tipo de Tratamiento</h3>
                        <div className="h-[280px]">
                            <Chart type="bar" data={stackedBarData} options={stackedBarOptions} />
                        </div>
                    </div>

                    <div></div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800">Matriz de Tratamiento de Materiales</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Material</th>
                                    {treatmentLabels.map(head => (
                                        <th key={head} className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            {head}
                                        </th>
                                    ))}
                                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {registros.map((row, idx) => {
                                    const rowTotal = treatmentKeys.reduce((acc, key) => acc + row[key], 0)
                                    return (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-700 text-sm whitespace-nowrap">{row.material}</td>
                                            {treatmentKeys.map((key) => (
                                                <td key={key} className="px-4 py-4 text-center text-sm text-gray-600">
                                                    {row[key] > 0 ? row[key] : <span className="text-gray-300">-</span>}
                                                </td>
                                            ))}
                                            <td className="px-4 py-4 text-center bg-gray-50 font-bold text-gray-800 text-sm">
                                                {rowTotal}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Equivalente en árboles */}
                <div className="flex justify-end mt-6">

                </div>
            </div>
        </div>
    )
}
