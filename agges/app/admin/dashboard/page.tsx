'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('../../../components/Chart'), { ssr: false })
import Calendar from '../../../components/Calendar'
import { exportToPDF } from '../../../utils/exportUtils'

// Importar datos de prueba
import mockAdminData from '../../../data/mockAdminDashboardData.json'

export default function AdminDashboard() {
  const router = useRouter()
  const { stats, history, labels, topCliente, actividadReciente } = mockAdminData
  const [timeFilter, setTimeFilter] = useState<'1w' | '1m' | '3m' | '6m' | '1y'>('1w')

  const formatearNumero = (num: number) => {
    return new Intl.NumberFormat('es-CL').format(num)
  }

  // Obtener datos filtrados por tiempo
  const currentHistory = history[timeFilter]

  // Gráfico de Servicios Solicitados
  const chartServiciosData = useMemo(() => ({
    labels: labels.servicios,
    datasets: [
      {
        label: 'Servicios',
        data: currentHistory.servicios,
        backgroundColor: [
          '#6fb33d',
          '#3498db',
          '#f39c12',
          '#9b59b6',
          '#e74c3c'
        ],
        borderRadius: 8,
      },
    ],
  }), [currentHistory, labels.servicios])

  const chartServiciosOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Servicios Solicitados por Tipo' },
    },
  }

  // Gráfico de Materiales Recolectados
  const chartMaterialesData = useMemo(() => ({
    labels: labels.materiales,
    datasets: [
      {
        label: 'Kg Recolectados',
        data: currentHistory.materiales,
        backgroundColor: [
          '#7f8c8d',
          '#b45f06',
          '#1abc9c',
          '#f1c40f',
          '#3498db'
        ],
        hoverOffset: 4
      },
    ],
  }), [currentHistory, labels.materiales])

  const chartMaterialesOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      title: { display: true, text: 'Distribución de Materiales (kg)' },
    },
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel Administrativo</h1>
            <p className="text-gray-500 font-medium">Resumen general de operaciones y métricas clave</p>
          </div>

          {/* Filtros Temporales */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-fit h-fit self-start">
            {(['1w', '1m', '3m', '6m', '1y'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${timeFilter === filter
                  ? 'bg-white text-[#6fb33d] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {filter === '1w' ? '1S' : filter === '1m' ? '1M' : filter === '3m' ? '3M' : filter === '6m' ? '6M' : '1A'}
              </button>
            ))}
          </div>

          <button
            onClick={() => exportToPDF('admin-dashboard-content', 'informe-admin-agges')}
            className="no-export flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md"
          >
            <span>📥</span> Exportar Informe
          </button>
        </header>

        <div id="admin-dashboard-content">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-xs uppercase font-bold text-gray-400 mb-2 tracking-wider">Total Clientes</p>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-extrabold text-gray-800">{stats.totalClientes}</h3>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-blue-500 text-lg">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-xs uppercase font-bold text-gray-400 mb-2 tracking-wider">Reservas Hoy</p>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-extrabold text-[#6fb33d]">{stats.reservasHoy}</h3>
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <span className="text-green-500 text-lg">📅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-xs uppercase font-bold text-gray-400 mb-2 tracking-wider">Materiales Hoy (kg)</p>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-extrabold text-orange-500">{formatearNumero(stats.materialesHoyKg)}</h3>
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  <span className="text-orange-500 text-lg">♻️</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-xs uppercase font-bold text-gray-400 mb-2 tracking-wider">Nuevas Cotizaciones</p>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-extrabold text-purple-500">{stats.nuevasCotizaciones}</h3>
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <span className="text-purple-500 text-lg">📄</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Principal - Gráficos */}
            <div className="lg:col-span-2 space-y-8">

              {/* Gráfico de Servicios */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <Chart type="bar" data={chartServiciosData} options={chartServiciosOptions} height={250} />
              </section>

              {/* Fila de Gráfico Circular y Cliente Top */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <Chart type="pie" data={chartMaterialesData} options={chartMaterialesOptions} height={250} />
                </section>

                {/* Cliente Top Card */}
                <section className="bg-[#6fb33d] rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🏆</span>
                      <h3 className="text-xl font-bold">Cliente Top</h3>
                    </div>
                    <h4 className="text-3xl font-black mb-1">{topCliente.nombre}</h4>
                    <p className="text-green-100 text-sm mb-6">El cliente con mayor actividad</p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-80">Servicios Solicitados</p>
                        <p className="text-2xl font-bold">{topCliente.serviciosSolicitados}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-80">Total Reciclado</p>
                        <p className="text-2xl font-bold">{formatearNumero(topCliente.totalRecicladoKg)} kg</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20">
                      <p className="text-xs italic opacity-90">{topCliente.ultimoServicio}</p>
                    </div>
                  </div>
                  {/* Decoración */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                </section>
              </div>
            </div>

            {/* Columna Lateral - Actividad y Accesos */}
            <aside className="space-y-8">
              {/* Actividad Reciente */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Actividad Reciente</h3>
                <div className="space-y-6">
                  {actividadReciente.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${item.tipo === 'servicio' ? 'bg-green-50 text-green-600' :
                        item.tipo === 'documento' ? 'bg-blue-50 text-blue-600' :
                          'bg-purple-50 text-purple-600'
                        }`}>
                        {item.tipo === 'servicio' ? '🚛' : item.tipo === 'documento' ? '📝' : '👤'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{item.cliente}</h4>
                        <p className="text-xs text-gray-500">{item.accion}</p>
                        <span className="text-[10px] text-gray-400">{item.fecha}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => router.push('/admin/clientes')}
                  className="w-full mt-8 py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all"
                >
                  Ver Todo el Historial
                </button>
              </section>

              {/* Calendario / Mini View */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Agenda Operativa</h3>
                <div className="rounded-xl overflow-hidden scale-90 -mx-4">
                  <Calendar />
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
