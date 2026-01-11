'use client'
import { useState } from 'react'

interface ServicioItem {
  id: string
  nombre: string
  tipoServicio: string
  descripcion: string
  cantidad: number
  unidad: string
}

export default function CotizacionPage() {
  const [formData, setFormData] = useState({
    numeroCotizacion: 'AUTO',
    fechaEmision: new Date().toISOString().split('T')[0],
    fechaVencimiento: '',
    moneda: 'CLP',
    formaPago: 'Crédito',
    observaciones: '',
    // Datos del cliente
    razonSocial: '',
    rut: '',
    division: '',
    direccion: '',
    region: '',
    comuna: '',
    contacto: '',
    cargo: '',
    correo: ''
  })

  const [servicios, setServicios] = useState<ServicioItem[]>([{
    id: '001',
    nombre: '',
    tipoServicio: '',
    descripcion: '',
    cantidad: 1,
    unidad: 'unidad'
  }])

  const serviciosDisponibles = [
    'Asesoría en Gestión de Reciclables',
    'Levantamiento y Segregación de Residuos',
    'Segregación y Acondicionamiento de Residuos',
    'Administración de Instalaciones de Reciclaje',
    'Arriendo de Contenedores para Segregación',
    'Recogida, Transporte y Reciclaje de Residuos',
    'Economía Circular con Impacto Social'
  ]

  const regionesChile = [
    'Arica y Parinacota',
    'Tarapacá',
    'Antofagasta',
    'Atacama',
    'Coquimbo',
    'Valparaíso',
    'Metropolitana',
    'O\'Higgins',
    'Maule',
    'Ñuble',
    'Biobío',
    'La Araucanía',
    'Los Ríos',
    'Los Lagos',
    'Aysén',
    'Magallanes'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleServicioChange = (index: number, field: keyof ServicioItem, value: string | number) => {
    const nuevosServicios = [...servicios]
    nuevosServicios[index] = {
      ...nuevosServicios[index],
      [field]: value
    }
    setServicios(nuevosServicios)
  }

  const agregarServicio = () => {
    setServicios([...servicios, {
      id: String(servicios.length + 1).padStart(3, '0'),
      nombre: '',
      tipoServicio: '',
      descripcion: '',
      cantidad: 1,
      unidad: 'unidad'
    }])
  }

  const eliminarServicio = (index: number) => {
    if (servicios.length > 1) {
      setServicios(servicios.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Cotización solicitada:', { formData, servicios })
    alert('Cotización enviada exitosamente. Te contactaremos pronto.')
  }

  return (
    <div className="min-h-screen bg-[var(--color-light-gray)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-dark-gray)]">
            Solicitar Cotización
          </h1>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-white text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="cotizacion-form"
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[#6fb33d] transition-colors"
            >
              Enviar Cotización
            </button>
          </div>
        </div>

        <form id="cotizacion-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Información General */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[var(--color-dark-gray)] mb-4 pb-2 border-b-2 border-[var(--color-primary)]">
              Información General
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Fecha de Emisión
                </label>
                <input
                  type="date"
                  name="fechaEmision"
                  value={formData.fechaEmision}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Forma de Pago
                </label>
                <select
                  name="formaPago"
                  value={formData.formaPago}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                >
                  <option value="Crédito">Crédito</option>
                  <option value="Contado">Contado</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Datos del Cliente */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[var(--color-dark-gray)] mb-4 pb-2 border-b-2 border-[var(--color-primary)]">
              Datos del Cliente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Razón Social *
                </label>
                <input
                  type="text"
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  RUT *
                </label>
                <input
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleInputChange}
                  placeholder="12.345.678-9"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  División
                </label>
                <input
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Región *
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                >
                  <option value="">Selecciona una región</option>
                  {regionesChile.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Comuna *
                </label>
                <input
                  type="text"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Contacto *
                </label>
                <input
                  type="text"
                  name="contacto"
                  value={formData.contacto}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Cargo
                </label>
                <input
                  type="text"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-dark-gray)] mb-2">
                  Correo *
                </label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Servicios Solicitados */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-[var(--color-primary)]">
              <h2 className="text-xl font-bold text-[var(--color-dark-gray)]">
                Servicios Solicitados
              </h2>
              <button
                type="button"
                onClick={agregarServicio}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-semibold text-sm hover:bg-[#6fb33d] transition-colors"
              >
                + Agregar Servicio
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-[var(--color-light-green)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-dark-gray)]">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-dark-gray)]">Tipo de Servicio</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-dark-gray)]">Descripción</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-dark-gray)]">Cantidad</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-dark-gray)]">Unidad</th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase text-[var(--color-dark-gray)]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((servicio, index) => (
                    <tr key={servicio.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{servicio.id}</td>
                      <td className="px-4 py-3">
                        <select
                          value={servicio.tipoServicio}
                          onChange={(e) => handleServicioChange(index, 'tipoServicio', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-primary)]"
                          required
                        >
                          <option value="">Seleccionar...</option>
                          {serviciosDisponibles.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={servicio.descripcion}
                          onChange={(e) => handleServicioChange(index, 'descripcion', e.target.value)}
                          placeholder="Detalles del servicio"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-primary)]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={servicio.cantidad}
                          onChange={(e) => handleServicioChange(index, 'cantidad', parseInt(e.target.value) || 0)}
                          min="1"
                          className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-primary)]"
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={servicio.unidad}
                          onChange={(e) => handleServicioChange(index, 'unidad', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-primary)]"
                        >
                          <option value="unidad">Unidad</option>
                          <option value="kg">Kg</option>
                          <option value="ton">Tonelada</option>
                          <option value="m3">m³</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => eliminarServicio(index)}
                          disabled={servicios.length === 1}
                          className="text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Observaciones */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[var(--color-dark-gray)] mb-4 pb-2 border-b-2 border-[var(--color-primary)]">
              Observaciones
            </h2>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              rows={4}
              placeholder="Agrega cualquier información adicional relevante..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all resize-vertical"
            />
          </div>
        </form>

        {/* Historial */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[var(--color-dark-gray)] mb-4">Mis Cotizaciones</h2>
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <p>No hay cotizaciones registradas</p>
          </div>
        </div>
      </div>
    </div>
  )
}