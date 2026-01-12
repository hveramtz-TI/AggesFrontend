'use client'
import { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { useClientes } from '@/hooks'
import type { ClienteSimple } from '@/api/models'

import ClientesTable from './ClientesTable'
import Pagination from '@/components/common/Pagination'
import SearchBar from '@/components/common/SearchBar'
import ModalDelete from '@/components/common/ModalDelete'

export default function ClientesPage() {
  const [clientes, setClientes] = useState<ClienteSimple[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [clienteAEliminar, setClienteAEliminar] = useState<ClienteSimple | null>(null)
  const { getClientes, loading } = useClientes()

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const data = await getClientes()
        // Mapear a ClienteSimple (id, razonSocial, rut)
        const clientesMapeados: ClienteSimple[] = data.map((cliente: { id: number; razonSocial?: string; rut?: string }) => ({
          id: cliente.id,
          razonSocial: cliente.razonSocial ?? '',
          rut: cliente.rut ?? '',
        }))
        setClientes(clientesMapeados)
      } catch (error) {
        console.error('Error al cargar clientes:', error)
      }
    }

    cargarClientes()
  }, [])

  const handleEditar = (id: number) => {
    console.log('Editar cliente:', id)
    // TODO: Navegar a edición o abrir modal
  }


  const handleEliminar = (id: number) => {
    const cliente = clientes.find(c => c.id === id) || null
    setClienteAEliminar(cliente)
    setShowDeleteModal(true)
  }

  const confirmarEliminar = async () => {
    if (clienteAEliminar) {
      // TODO: Implementar eliminación con API
      setClientes(clientes.filter(cliente => cliente.id !== clienteAEliminar.id))
      setShowDeleteModal(false)
      setClienteAEliminar(null)
    }
  }

  const cancelarEliminar = () => {
    setShowDeleteModal(false)
    setClienteAEliminar(null)
  }

  const handleVerArchivos = (id: number) => {
    console.log('Ver archivos del cliente:', id)
    // TODO: Navegar a archivos del cliente
  }


  // Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.rut.toLowerCase().includes(busqueda.toLowerCase())
  )
  const totalPages = Math.ceil(clientesFiltrados.length / pageSize) || 1
  const paginatedClientes = clientesFiltrados.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Resetear página al filtrar
  // (Ahora se maneja en el onChange del input de búsqueda)

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
        <SearchBar
          value={busqueda}
          onChange={value => {
            setBusqueda(value)
            setCurrentPage(1)
          }}
          placeholder="Buscar por nombre o RUT..."
          className="mb-6"
        />

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[#6fb33d] p-6 rounded-xl text-white shadow-md">
            <p className="text-sm opacity-90 font-medium mb-2">Total Clientes</p>
            <p className="text-4xl font-bold">{clientes.length}</p>
          </div>
        </div>

        {/* Tabla de clientes */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-600">
              Cargando clientes...
            </div>
          ) : (
            <>
              <ClientesTable
                clientes={paginatedClientes}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
                onVerArchivos={handleVerArchivos}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              <ModalDelete
                open={showDeleteModal}
                onClose={cancelarEliminar}
                onConfirm={confirmarEliminar}
                title="¿Estás seguro de eliminar este cliente?"
                description={clienteAEliminar ? `Esta acción eliminará a "${clienteAEliminar.razonSocial}" y no se puede deshacer.` : ''}
                confirmText="Sí, eliminar"
                cancelText="No, cancelar"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
