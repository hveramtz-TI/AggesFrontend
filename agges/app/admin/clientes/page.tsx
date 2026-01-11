'use client'
import { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { useClientes } from '@/hooks'
import type { ClienteSimple } from '@/api/models'

export default function ClientesPage() {
  const [clientes, setClientes] = useState<ClienteSimple[]>([])
  const [busqueda, setBusqueda] = useState('')
  const { getClientes, loading } = useClientes()

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const data = await getClientes()
        setClientes(data)
      } catch (error) {
        console.error('Error al cargar clientes:', error)
      }
    }

    cargarClientes()
  }, [])

  const handleToggleEstado = async (id: number) => {
    // TODO: Implementar toggle de estado con API
    setClientes(clientes.map(cliente => 
      cliente.id === id 
        ? { ...cliente, is_active: !cliente.is_active }
        : cliente
    ))
  }

  const handleEditar = (id: number) => {
    console.log('Editar cliente:', id)
    // TODO: Navegar a edición o abrir modal
  }

  const handleEliminar = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      // TODO: Implementar eliminación con API
      setClientes(clientes.filter(cliente => cliente.id !== id))
    }
  }

  const handleVerArchivos = (id: number) => {
    console.log('Ver archivos del cliente:', id)
    // TODO: Navegar a archivos del cliente
  }

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.username.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[var(--color-light-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-dark-gray)]">
            Gestión de Clientes
          </h1>
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            + Nuevo Cliente
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(131,202,74,0.1)] transition-all"
            placeholder="Buscar por nombre o email..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[#6fb33d] p-6 rounded-xl text-white shadow-md">
            <p className="text-sm opacity-90 font-medium mb-2">Total Clientes</p>
            <p className="text-4xl font-bold">{clientes.length}</p>
          </div>
          <div className="bg-gradient-to-br from-[var(--color-dark-gray)] to-[#505050] p-6 rounded-xl text-white shadow-md">
            <p className="text-sm opacity-90 font-medium mb-2">Activos</p>
            <p className="text-4xl font-bold">
              {clientes.filter(c => c.is_active).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#9dd46a] to-[var(--color-primary)] p-6 rounded-xl text-white shadow-md">
            <p className="text-sm opacity-90 font-medium mb-2">Inactivos</p>
            <p className="text-4xl font-bold">
              {clientes.filter(c => !c.is_active).length}
            </p>
          </div>
        </div>

        {/* Tabla de clientes */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-600">
              Cargando clientes...
            </div>
          ) : clientesFiltrados.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-xl text-gray-600 mb-2">No se encontraron clientes</p>
              <p className="text-sm text-gray-500">
                {busqueda ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primer cliente'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[var(--color-light-green)]">
                  <tr>
                    <th className="px-4 py-4 text-left font-bold text-[var(--color-dark-gray)] text-xs uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-4 py-4 text-left font-bold text-[var(--color-dark-gray)] text-xs uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-4 text-left font-bold text-[var(--color-dark-gray)] text-xs uppercase tracking-wider">
                      Fecha Registro
                    </th>
                    <th className="px-4 py-4 text-center font-bold text-[var(--color-dark-gray)] text-xs uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 py-4 text-right font-bold text-[var(--color-dark-gray)] text-xs uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.map((cliente) => (
                    <tr 
                      key={cliente.id} 
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors $
{!cliente.is_active ? 'opacity-50' : ''}`}
                    >
                      <td className="px-4 py-4 font-bold text-[var(--color-dark-gray)] max-w-[250px]">
                        {cliente.username}
                      </td>
                      <td className="px-4 py-4 text-[var(--color-dark-gray)]">
                        {cliente.email}
                      </td>
                      <td className="px-4 py-4 text-[var(--color-dark-gray)]">
                        {new Date(cliente.date_joined).toLocaleDateString('es-CL')}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <label className="relative inline-block w-[50px] h-6 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cliente.is_active}
                            onChange={() => handleToggleEstado(cliente.id)}
                            className="opacity-0 w-0 h-0 peer"
                          />
                          <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[var(--color-primary)]"></span>
                          <span className="absolute left-[3px] bottom-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform peer-checked:translate-x-[26px]"></span>
                        </label>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEditar(cliente.id)}
                            className="p-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[#6fb33d] transition-all hover:transform hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center"
                            title="Editar"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleVerArchivos(cliente.id)}
                            className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all hover:transform hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center"
                            title="Ver Archivos"
                          >
                            <FaFolder />
                          </button>
                          <button
                            onClick={() => handleEliminar(cliente.id)}
                            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all hover:transform hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center"
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
