import React from 'react'
import { FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import type { ClienteSimple } from '@/api'

interface ClientesTableProps {
  clientes: ClienteSimple[]
  onEditar: (id: number) => void
  onEliminar: (id: number) => void
  onVerArchivos: (id: number) => void
}

export default function ClientesTable({ clientes, onEditar, onEliminar, onVerArchivos }: ClientesTableProps) {
  if (clientes.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="text-6xl mb-4">👥</div>
        <p className="text-xl text-gray-600 mb-2">No se encontraron clientes</p>
        <p className="text-sm text-gray-500">
          Comienza agregando tu primer cliente
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-[var(--color-light-green)]">
          <tr>
            <th className="px-4 py-4 text-left font-bold text-[var(--color-dark-gray)] text-xs uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-4 py-4 text-left font-bold text-[var(--color-dark-gray)] text-xs uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-4 text-left font-bold text-[var(--color-dark-gray)] text-xs uppercase tracking-wider">
              Rut
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
          {clientes.map((cliente) => (
            <tr 
              key={cliente.id} 
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-4 font-bold text-[var(--color-dark-gray)] max-w-[250px]">
                {/* Nombre: username */}
                {cliente.username ?? '-'}
              </td>
              <td className="px-4 py-4 text-[var(--color-dark-gray)]">
                {/* Email */}
                {cliente.email ?? '-'}
              </td>
              <td className="px-4 py-4 text-[var(--color-dark-gray)]">
                {/* Rut */}
                {cliente.rut ?? '-'}
              </td>
              <td className="px-4 py-4 text-center">
                {/* Estado: activo/inactivo si existe is_active */}
                {'is_active' in cliente ? (cliente.is_active ? 'Activo' : 'Inactivo') : '-'}
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onEditar(cliente.id)}
                    className="p-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[#6fb33d] transition-all hover:transform hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onVerArchivos(cliente.id)}
                    className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all hover:transform hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center"
                    title="Ver Archivos"
                  >
                    <FaFolder />
                  </button>
                  <button
                    onClick={() => onEliminar(cliente.id)}
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
  )
}
