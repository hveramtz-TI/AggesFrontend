'use client'
import { useRouter } from 'next/navigation'

export default function ClientDashboard() {
  const router = useRouter()

  // Datos simulados del reporte (deben venir del backend)
  const report = {
    numero: 465,
    empresa: "Cliente",
    mes: "Diciembre",
    anio: 2025,
    materiales: {
      vidrio: 0,
      plastico: 0,
      carton: 0,
      metal: 0,
      papel: 0,
      madera: 0,
      organico: 0,
      escombro: 7330,
      otro: 0
    },
    tratamiento: {
      reutilizacion: 0,
      reparacion: 0,
      reciclaje: 0,
      eliminacion: 7330
    },
    puntosAGGES: {
      total: 0
    }
  }

  const totalGestionado = Object.values(report.materiales).reduce((a, b) => a + b, 0)
  const totalReciclaje = report.tratamiento.reciclaje + report.tratamiento.reutilizacion + report.tratamiento.reparacion
  const porcentajeReciclaje = totalGestionado > 0 ? ((totalReciclaje / totalGestionado) * 100).toFixed(2) : '0'

  const materialPrincipal = Object.entries(report.materiales)
    .sort(([, a], [, b]) => b - a)[0]

  const formatearNumero = (num: number) => {
    return new Intl.NumberFormat('es-CL').format(num)
  }

  return (
    <div className="min-h-screen bg-[var(--color-light-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-4 border-b-2 border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-dark-gray)] mb-2">
            Reporte de Gestión de Residuos
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <p>
              <strong className="text-[var(--color-dark-gray)] mr-2">Reporte N°:</strong>
              {report.numero}
            </p>
            <p>
              <strong className="text-[var(--color-dark-gray)] mr-2">Empresa:</strong>
              {report.empresa}
            </p>
            <p>
              <strong className="text-[var(--color-dark-gray)] mr-2">Período:</strong>
              {report.mes} {report.anio}
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[var(--color-primary)] transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📦</div>
              <div className="flex-1">
                <h3 className="text-xs uppercase font-bold text-gray-600 mb-1">Total Gestionado</h3>
                <p className="text-3xl font-bold text-[var(--color-dark-gray)]">
                  {formatearNumero(totalGestionado)}
                </p>
                <span className="text-xs text-gray-500">kg</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#6fb33d] transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-4xl">♻️</div>
              <div className="flex-1">
                <h3 className="text-xs uppercase font-bold text-gray-600 mb-1">Reciclaje</h3>
                <p className="text-3xl font-bold text-[var(--color-dark-gray)]">
                  {porcentajeReciclaje}%
                </p>
                <span className="text-xs text-gray-500">{formatearNumero(totalReciclaje)} kg</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#f39c12] transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📊</div>
              <div className="flex-1">
                <h3 className="text-xs uppercase font-bold text-gray-600 mb-1">Material Principal</h3>
                <p className="text-2xl font-bold text-[var(--color-dark-gray)] capitalize">
                  {materialPrincipal[0]}
                </p>
                <span className="text-xs text-gray-500">{formatearNumero(materialPrincipal[1])} kg</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#9dd46a] transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⭐</div>
              <div className="flex-1">
                <h3 className="text-xs uppercase font-bold text-gray-600 mb-1">Puntos AGGES</h3>
                <p className="text-3xl font-bold text-[var(--color-dark-gray)]">
                  {formatearNumero(report.puntosAGGES.total)}
                </p>
                <span className="text-xs text-gray-500">puntos acumulados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de accesos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[var(--color-primary)] bg-opacity-10 rounded-lg">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-dark-gray)]">Cotizaciones</h3>
                <p className="text-sm text-gray-600">Solicita nuevos servicios</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/client/cotizacion')}
              className="w-full py-2 px-4 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[#6fb33d] transition-colors"
            >
              Ver Cotizaciones
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-500 bg-opacity-10 rounded-lg">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-dark-gray)]">Archivos</h3>
                <p className="text-sm text-gray-600">Gestiona tus documentos</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/client/archivos')}
              className="w-full py-2 px-4 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[#6fb33d] transition-colors"
            >
              Ver Archivos
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-300 bg-opacity-50 rounded-lg">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-dark-gray)]">Reportes</h3>
                <p className="text-sm text-gray-600">Próximamente disponible</p>
              </div>
            </div>
            <button
              disabled
              className="w-full py-2 px-4 bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-not-allowed"
            >
              Próximamente
            </button>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[var(--color-dark-gray)] mb-4">Actividad Reciente</h2>
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📅</div>
            <p>No hay actividad reciente</p>
          </div>
        </div>
      </div>
    </div>
  )
}
