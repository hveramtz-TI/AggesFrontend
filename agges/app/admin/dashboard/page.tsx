'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import Calendar from '@/components/Calendar';

const Chart = dynamic(() => import('../../../components/Chart'), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter()

  // Datos simulados para el gráfico de resumen
  const resumenLabels = ['Clientes', 'Cotizaciones', 'Proyectos', 'Documentos'];
  const resumenData = [10, 5, 3, 8]; // Simulado, reemplazar por datos reales
  const chartResumenData = {
    labels: resumenLabels,
    datasets: [
      {
        label: 'Resumen',
        data: resumenData,
        backgroundColor: [
          '#6fb33d', '#f39c12', '#3498db', '#9b59b6'
        ],
      },
    ],
  };
  const chartResumenOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Resumen general' },
    },
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[var(--color-dark-gray)]">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600">Panel de control y gestión</p>
        </div>

        {/* Estadísticas principales - Cards con border-left */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[var(--color-primary)]">
            <h3 className="text-xs uppercase font-bold text-[var(--color-dark-gray)] opacity-70 mb-3 tracking-wide">
              Total Clientes
            </h3>
            <p className="text-4xl font-bold text-[var(--color-primary)] mb-0">0</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[var(--color-primary)]">
            <h3 className="text-xs uppercase font-bold text-[var(--color-dark-gray)] opacity-70 mb-3 tracking-wide">
              Cotizaciones Pendientes
            </h3>
            <p className="text-4xl font-bold text-[var(--color-primary)] mb-0">0</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[var(--color-primary)]">
            <h3 className="text-xs uppercase font-bold text-[var(--color-dark-gray)] opacity-70 mb-3 tracking-wide">
              Proyectos Activos
            </h3>
            <p className="text-4xl font-bold text-[var(--color-primary)] mb-0">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[var(--color-primary)]">
            <h3 className="text-xs uppercase font-bold text-[var(--color-dark-gray)] opacity-70 mb-3 tracking-wide">
              Documentos
            </h3>
            <p className="text-4xl font-bold text-[var(--color-primary)] mb-0">0</p>
          </div>
        </div>

        {/* Gráfico resumen */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <Chart type="pie" data={chartResumenData} options={chartResumenOptions} height={80} />
        </div>

        {/* Accesos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card - Clientes */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-light-green)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold ml-3 text-[var(--color-dark-gray)]">Clientes</h3>
            </div>
            <p className="text-gray-600 mb-4">Gestión de clientes registrados</p>
            <button
              onClick={() => router.push('/admin/clientes')}
              className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Gestionar Clientes
            </button>
          </div>

          {/* Card - Archivos */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-light-green)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold ml-3 text-[var(--color-dark-gray)]">Archivos</h3>
            </div>
            <p className="text-gray-600 mb-4">Gestión de documentos</p>
            <button
              onClick={() => router.push('/admin/archivos')}
              className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Ver Archivos
            </button>
          </div>

          {/* Card - Reportes */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-light-green)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold ml-3 text-[var(--color-dark-gray)]">Reportes</h3>
            </div>
            <p className="text-gray-600 mb-4">Estadísticas y métricas</p>
            <button className="px-4 py-2 rounded-lg font-semibold bg-gray-300 text-gray-600 cursor-not-allowed">
              Próximamente
            </button>
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-dark-gray)]">Actividad Reciente</h2>
          <Calendar/>
        </div>
      </div>
    </div>
  )
}



