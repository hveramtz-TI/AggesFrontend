import React from 'react'
import { FaEdit, FaDownload, FaTrash } from 'react-icons/fa'
import type { Archivo } from '@/api'

interface ArchivosTableProps {
  archivos: Archivo[]
  getFileIcon: (tipo: string) => React.ReactElement
  formatFecha: (fecha?: string) => string
  onEdit: (archivo: Archivo) => void
  onDownload: (archivo: Archivo) => void
  onDelete: (archivo: Archivo) => void
  downloadingId?: number | null
}

export default function ArchivosTable({ archivos, getFileIcon, formatFecha, onEdit, onDownload, onDelete, downloadingId }: ArchivosTableProps) {
  if (archivos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📁</div>
        <p className="text-xl text-gray-600 mb-2">No hay archivos disponibles</p>
        <p className="text-sm text-gray-500">Los archivos subidos aparecerán aquí</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-auto">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--color-dark-gray)] text-white">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider w-16">Tipo</th>
              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Archivo</th>
              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Fecha</th>
              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Cliente</th>
              <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider w-48">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {archivos.map((archivo) => (
              <tr key={archivo.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                <td className="px-4 py-4 text-center">
                  {getFileIcon(archivo.tipo_mime)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[var(--color-dark-gray)] max-w-xs break-words">
                      {archivo.nombre_archivo || 'N/A'}
                    </span>
                    <span className="text-xs text-gray-500">{archivo.tamaño_legible ? `(${archivo.tamaño_legible})` : ''}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {formatFecha(archivo.fecha_subida || archivo.fecha_carga)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wide">Cliente:</span>
                    <span className="text-sm font-medium text-[var(--color-dark-gray)]">
                      {archivo.nombre_usuario_compartido || 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(archivo)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-md"
                      title="Editar"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDownload(archivo)}
                      className={`p-2 bg-[var(--color-primary)] text-white rounded-lg transition-all duration-300 hover:bg-[#6fb33d] hover:transform hover:-translate-y-0.5 hover:shadow-md ${downloadingId === archivo.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="Descargar"
                      disabled={downloadingId === archivo.id}
                    >
                      {downloadingId === archivo.id ? (
                        <span className="text-xs">Descargando...</span>
                      ) : (
                        <FaDownload className="text-lg" />
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(archivo)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-md"
                      title="Eliminar"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
