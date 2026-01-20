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

const Chart = dynamic(() => import('../../../../components/Chart'), { ssr: false })

export default function GestionResiduosPage() {

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

    // Configuración Chart: Distribución por Tratamiento
    const barData = useMemo(() => ({
        labels: treatmentLabels,
        datasets: [
            {
                label: 'Total Kilos Procesados',
                data: treatmentTotals,
                backgroundColor: '#6fb33d', // Agges Green
                borderRadius: 6,
                barThickness: 30
            }
        ]
    }), [treatmentTotals])


    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Volumen por Tipo de Tratamiento'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6' },
                ticks: { font: { size: 10 }, color: '#9ca3af' },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 11 }, color: '#6b7280' },
                border: { display: false }
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
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

                {/* Stats Cards (Huellas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Impacto Ambiental</p>
                            <h3 className="text-2xl font-extrabold text-gray-800">Huella de Carbono</h3>
                            <p className="text-sm text-green-500 font-semibold mt-1">{stats.huellaCarbono.valor} {stats.huellaCarbono.unidad} <span className="text-xs text-gray-400">({stats.huellaCarbono.cambio})</span></p>
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
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl">
                            <FaTint />
                        </div>
                    </div>
                </div>

                {/* Main Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Distribución por Material (Pie) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Distribución Total (Kg)</h3>
                        <div className="h-[280px] relative">
                            <Chart type="pie" data={pieData} options={pieOptions} />
                        </div>
                    </div>

                    {/* Totales por Tratamiento (Bar) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Eficiencia de Tratamientos</h3>
                        <div className="h-[280px]">
                            <Chart type="bar" data={barData} options={barOptions} />
                        </div>
                    </div>
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
            </div>
        </div>
    )
}
