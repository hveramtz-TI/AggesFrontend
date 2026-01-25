'use client'
import { useState, useEffect } from 'react'
import { useClientes } from '@/hooks'
import type { ClienteSimple } from '@/api'

import ClientesTable from './ClientesTable'
import Pagination from '@/components/common/Pagination'
import SearchBar from '@/components/common/SearchBar'
import ModalCreateClient from './ModalCreateClient'
import ModalEditClient from './ModalEditClient'


export default function ClientesPage() {
  const [clientes, setClientes] = useState<ClienteSimple[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [clienteAEliminar, setClienteAEliminar] = useState<ClienteSimple | null>(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [formMode, setFormMode] = useState<'crear' | 'editar'>('crear')
  const [clienteEdit, setClienteEdit] = useState<ClienteSimple | null>(null)
  const { getClientes, loading } = useClientes()

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const data = await getClientes()
        // Mapear a ClienteSimple (id, username, rut, email)
        const clientesMapeados: ClienteSimple[] = data.map((cliente: { id: number; username?: string; rut?: string; email?: string }) => ({
          id: cliente.id,
          username: cliente.username ?? '',
          rut: cliente.rut ?? '',
          email: cliente.email ?? '',
        }))
        setClientes(clientesMapeados)
      } catch (error) {
        console.error('Error al cargar clientes:', error)
      }
    }

    cargarClientes()
  }, [])

  const handleEditar = (id: number) => {
    const cliente = clientes.find(c => c.id === id) || null;
    setClienteEdit(cliente);
    if (cliente) {
      setFormData({ username: cliente.username ?? '', rut: cliente.rut ?? '', email: cliente.email ?? '' });
    }
    setFormMode('editar');
    setShowFormModal(true);
  }
  // Modal de formulario (crear/editar)
  const handleOpenCrear = () => {
    setClienteEdit(null);
    // Inicializar formulario vacío al crear
    setFormData({ username: '', rut: '', email: '' });
    setFormMode('crear');
    setShowFormModal(true);
  };

  // Formulario de prueba
  const [formData, setFormData] = useState({ username: '', rut: '', email: '' });

  // Actualizar datos del formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Crear cliente (solo frontend, no envía al backend)
  const handleCrearCliente = async () => {
    setClientes([
      ...clientes,
      {
        id: Math.max(0, ...clientes.map(c => c.id)) + 1,
        username: formData.username,
        rut: formData.rut,
        email: formData.email,
      },
    ]);
    setShowFormModal(false);
    setFormData({ username: '', rut: '', email: '' });
  };

  // Editar cliente (solo frontend, no envía al backend)
  const handleEditarCliente = async () => {
    setClientes(clientes.map(c =>
      c.id === clienteEdit?.id
        ? { ...c, username: formData.username, rut: formData.rut, email: formData.email }
        : c
    ));
    setShowFormModal(false);
    setClienteEdit(null);
    setFormData({ username: '', rut: '', email: '' });
  };

  // El formulario se inicializa en los handlers (handleEditar / handleOpenCrear)


  const handleEliminar = (id: number) => {
    const cliente = clientes.find(c => c.id === id) || null
    setClienteAEliminar(cliente)
    setShowDeleteModal(true)
  }

  const confirmarEliminar = async () => {
    if (clienteAEliminar) {
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
  }

  // Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.username.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.rut.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busqueda.toLowerCase())
  )
  const totalPages = Math.ceil(clientesFiltrados.length / pageSize) || 1
  const paginatedClientes = clientesFiltrados.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="min-h-screen bg-(--color-light-gray)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-(--color-dark-gray)">
            Gestión de Clientes
          </h1>
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onClick={handleOpenCrear}
          >
            + Nuevo Cliente
          </button>
        </div>

        {/* Modal Crear/Editar Cliente */}
        {formMode === 'crear' && (
          <ModalCreateClient
            open={showFormModal}
            onClose={() => { setShowFormModal(false); setClienteEdit(null); }}
            onCreate={handleCrearCliente}
            formData={formData}
            onFormChange={handleFormChange}
          />
        )}
        {formMode === 'editar' && (
          <ModalEditClient
            open={showFormModal}
            onClose={() => { setShowFormModal(false); setClienteEdit(null); }}
            onEdit={handleEditarCliente}
            formData={formData}
            onFormChange={handleFormChange}
          />
        )}

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
          <div className="bg-linear-to-br from-(--color-primary) to-[#6fb33d] p-6 rounded-xl text-white shadow-md">
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
            <ClientesTable
              clientes={paginatedClientes}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
              onVerArchivos={handleVerArchivos}
            />
          )}
        </div>
        {/* Pagination debajo de la tabla */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}
