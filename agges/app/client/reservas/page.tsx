'use client'

import React, { useState } from 'react'
import Calendar from '@/components/Calendar'
import Modal from '@/components/Modal'
import { FaCalendarPlus, FaTools, FaTruckLoading, FaRecycle, FaChartLine, FaBoxes, FaLeaf } from 'react-icons/fa'

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const AGGES_SERVICES: Service[] = [
  {
    id: 'asesoria',
    title: 'Asesoría en Gestión de Reciclables',
    icon: <FaChartLine className="text-blue-500" />,
    description: 'Consultoría experta para optimizar tus procesos de reciclaje y cumplimiento normativo.'
  },
  {
    id: 'levantamiento',
    title: 'Levantamiento y Segregación',
    icon: <FaTools className="text-orange-500" />,
    description: 'Servicio de clasificación y recolección de residuos directamente en tu ubicación.'
  },
  {
    id: 'acondicionamiento',
    title: 'Segregación y Acondicionamiento',
    icon: <FaBoxes className="text-purple-500" />,
    description: 'Tratamiento previo de materiales para maximizar su valor de recuperación.'
  },
  {
    id: 'administracion',
    title: 'Administración de Instalaciones',
    icon: <FaLeaf className="text-green-500" />,
    description: 'Gestión integral de tus puntos de reciclaje y centros de acopio.'
  },
  {
    id: 'arriendo',
    title: 'Arriendo de Contenedores',
    icon: <FaRecycle className="text-yellow-600" />,
    description: 'Suministro de contenedores especializados para diferentes tipos de residuos.'
  },
  {
    id: 'transporte',
    title: 'Recogida y Transporte',
    icon: <FaTruckLoading className="text-red-500" />,
    description: 'Logística eficiente para el traslado de residuos a centros de valorización.'
  },
  {
    id: 'economia',
    title: 'Economía Circular Social',
    icon: <FaCalendarPlus className="text-teal-500" />,
    description: 'Programas de impacto social integrados en la cadena de valor del reciclaje.'
  }
]

const ReservasPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    fecha: '',
    observaciones: '',
    cantidad: ''
  })

  const openReservationForm = (service: Service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setIsModalOpen(false)
    setFormData({ fecha: '', observaciones: '', cantidad: '' })
  }

  const renderFormContent = () => {
    if (!selectedService) return null;
    return (
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 mb-4">
          Estás solicitando: <strong>{selectedService.title}</strong>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Fecha Sugerida</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Cantidad estimada / Detalles</label>
          <input
            type="text"
            placeholder="Ej: 500 kg, 3 contenedores..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.cantidad}
            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Observaciones adicionales</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            placeholder="Horarios de preferencia, contacto en sitio, etc."
            value={formData.observaciones}
            onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#f8f9fa] p-4 sm:p-8'>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Reserva de Servicios Gratuitos</h1>
          <p className="text-gray-500 mt-2">Gestiona tus solicitudes de retiro y mantenimiento de forma rápida y sencilla.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listado de Servicios */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">1</span>
              Selecciona un Servicio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AGGES_SERVICES.map((service) => (
                <div
                  key={service.id}
                  onClick={() => openReservationForm(service)}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-green-200 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl p-3 bg-gray-50 rounded-xl group-hover:bg-green-50 transition-colors">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">{service.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lateral: Calendario y Mis Reservas */}
          <aside className="space-y-8">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Agenda de Actividad</h3>
              <div className="overflow-hidden rounded-xl border border-gray-50">
                <Calendar />
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center italic">
                Consulta los días disponibles para tus próximos servicios.
              </p>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Solicitudes Recientes</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-gray-700">Retiro de Vidrio</p>
                    <p className="text-xs text-gray-400">Programado: 22 Ene</p>
                  </div>
                  <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-bold uppercase">Pendiente</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center opacity-60">
                  <div>
                    <p className="text-sm font-bold text-gray-700">Mantenimiento Tolva</p>
                    <p className="text-xs text-gray-400">15 Ene</p>
                  </div>
                  <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded font-bold uppercase">Completado</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="formulario"
        title="Nueva Reserva de Servicio"
        formContent={renderFormContent()}
        onCreate={handleCreate}
      />
    </div>
  )
}

export default ReservasPage