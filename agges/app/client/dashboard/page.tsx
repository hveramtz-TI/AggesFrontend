'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('../../../components/Chart'), { ssr: false })
import Calendar from '../../../components/Calendar'
import { exportToPDF } from '../../../utils/exportUtils'

// Importar datos de prueba y equivalencias
import materialEquivalents from '../../../data/materialEquivalents.json'
import mockData from '../../../data/mockDashboardData.json'

// Definir tipos para mayor claridad
type MaterialKey = keyof typeof materialEquivalents;

export default function ClientDashboard() {
  const router = useRouter()
  const [timeFilter, setTimeFilter] = useState<'1w' | '1m' | '3m' | '1y'>('1w')

  const report = mockData.currentReport;
  const services = mockData.currentServices;
  const history = mockData.totalRecycledHistory[timeFilter];

  // Calcular composición basada en la historia seleccionada
  const currentComposition = useMemo(() => {
    const totals: Record<string, number> = {};
    history.forEach((entry) => {
      Object.entries(entry).forEach(([key, value]) => {
        if (key !== 'date') {
          totals[key] = (totals[key] || 0) + (value as number);
        }
      });
    });
    return totals;
  }, [history]);

  // Encontrar el material principal del período seleccionado
  const materialPrincipalKey = useMemo(() => {
    return (Object.entries(currentComposition)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'plastico') as MaterialKey;
  }, [currentComposition]);

  const materialPrincipalAmount = currentComposition[materialPrincipalKey] || 0;
  const equivalent = materialEquivalents[materialPrincipalKey];

  const formatearNumero = (num: number) => {
    return new Intl.NumberFormat('es-CL').format(num)
  }

  // Datos para el gráfico de barras (Composición del período seleccionado)
  const chartBarData = {
    labels: Object.keys(currentComposition).map(k => materialEquivalents[k as MaterialKey]?.label || k),
    datasets: [
      {
        label: 'Materiales (kg)',
        data: Object.values(currentComposition),
        backgroundColor: [
          '#b45f06', // Madera
          '#1abc9c', // Plástico
          '#7f8c8d', // Escombro
          '#3498db', // Metal
          '#f1c40f', // Cartón
          '#e74c3c', // Orgánico
          '#9b59b6', // Vidrio
          '#2ecc71', // Papel
        ],
        borderRadius: 8,
      },
    ],
  }

  const chartBarOptions = {
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Composición de Materiales (${timeFilter === '1w' ? '1S' : timeFilter === '1m' ? '1M' : timeFilter === '3m' ? '3M' : '1A'})` },
    },
    scales: {
      y: { beginAtZero: true }
    }
  }

  // Datos para el gráfico de líneas (Histórico)
  const chartLineData = useMemo(() => ({
    labels: history.map(d => d.date),
    datasets: [
      {
        label: 'Total Reciclado (kg)',
        data: history.map(d => Object.entries(d).reduce((acc, [k, v]) => k !== 'date' ? acc + (v as number) : acc, 0)),
        borderColor: '#6fb33d',
        backgroundColor: 'rgba(111, 179, 61, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      }
    ],
  }), [history])

  const chartLineOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true }
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header con estilo de la imagen */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Panel de Impacto Ambiental y Servicios</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
                <p>Reporte N°: <span className="text-gray-700">{report.numero}</span></p>
                <p>Empresa: <span className="text-gray-700">{report.empresa}</span></p>
                <p>Período: <span className="text-gray-700">{report.periodo}</span></p>
              </div>
            </div>

            <button
              onClick={() => exportToPDF('client-dashboard-content', `informe-cliente-${report.empresa.replace(/\s+/g, '-').toLowerCase()}`)}
              className="no-export flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md"
            >
              <span>📥</span> Descargar Informe PDF
            </button>
          </div>
        </header>

        <div id="client-dashboard-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Principal (Izquierda) */}
            <div className="lg:col-span-2 space-y-8">

              {/* Card de Impacto Principal (Rediseñado según imagen) */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 overflow-hidden relative">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Visualización del flujo */}
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{equivalent.icon}</div>
                    <div className="text-gray-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <div className="bg-green-50 p-4 rounded-full">
                      <div className="text-3xl">♻️</div>
                    </div>
                    <div className="text-gray-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <div className="text-6xl opacity-80">🏙️</div>
                  </div>

                  {/* Información de Impacto */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      Impacto Principal: {equivalent.label} → {equivalent.unidad_destino.split('(')[0]}
                    </h2>
                    <p className="text-gray-500 mb-4">Material Más Reciclado: <span className="font-semibold text-gray-700">{equivalent.label} ({formatearNumero(materialPrincipalAmount)} kg)</span></p>

                    <div className="mt-4">
                      <p className="text-gray-400 text-sm uppercase font-bold tracking-wider">Equivale a:</p>
                      <p className="text-4xl font-extrabold text-[#6fb33d]">
                        {formatearNumero(Math.round(materialPrincipalAmount * equivalent.factor))} {equivalent.unidad_destino}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gráfico Histórico con Filtros */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <h3 className="text-xl font-bold text-gray-800">Tendencia de Reciclaje</h3>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {(['1w', '1m', '3m', '1y'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setTimeFilter(filter)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${timeFilter === filter
                          ? 'bg-white text-[#6fb33d] shadow-sm'
                          : 'text-gray-400 hover:text-gray-600'
                          }`}
                      >
                        {filter === '1w' ? '1S' : filter === '1m' ? '1M' : filter === '3m' ? '3M' : '1A'}
                      </button>
                    ))}
                  </div>
                </div>
                <Chart type="line" data={chartLineData} options={chartLineOptions} height={250} />
              </section>

              {/* Composición de Materiales */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <Chart type="bar" data={chartBarData} options={chartBarOptions} height={250} />
              </section>
            </div>

            {/* Columna Lateral (Derecha) */}
            <aside className="space-y-8">
              {/* Estado de Servicios */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Estado de Servicios por Tomador</h3>
                <div className="space-y-4 mb-8">
                  {services.map((service) => (
                    <div key={service.id} className="group p-4 rounded-xl border border-gray-50 hover:border-green-100 hover:bg-green-50/30 transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-bold text-gray-800">{service.type}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">(Tomador: {service.requester}) - {service.date}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${service.statusColor === 'orange' ? 'bg-orange-100 text-orange-600' :
                          service.statusColor === 'green' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => router.push('/client/cotizacion')}
                  className="w-full py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all shadow-sm"
                >
                  Solicitar Nuevo Servicio
                </button>
              </section>

              {/* Calendario de Actividad */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Actividad Registrada</h3>
                <div className="overflow-hidden rounded-xl">
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
