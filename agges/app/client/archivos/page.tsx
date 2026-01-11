'use client'
import { useState, useEffect } from 'react'
import { FaFilePdf, FaFileExcel, FaFileWord, FaFilePowerpoint, FaFile, FaUpload, FaEdit, FaDownload, FaTrash } from 'react-icons/fa'
import { useArchivos } from '@/hooks'
import type { Archivo } from '@/api/models'

export default function ArchivosClientPage() {
  const { getArchivos, getArchivosCompartidos, downloadArchivo, deleteArchivo } = useArchivos()
  const [archivosDelCliente, setArchivosDelCliente] = useState<Archivo[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<Archivo | null>(null)

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        const [archivosPropios, archivosCompartidos] = await Promise.all([
          getArchivos(),
          getArchivosCompartidos()
        ])
        setArchivosDelCliente([
          ...archivosPropios.results,
          ...archivosCompartidos
        ])
      } catch (error) {
        console.error('Error al obtener archivos:', error)
      }
    }

    fetchArchivos()
  }, [])

  const getFileIcon = (tipoMime: string) => {
    const tipo = tipoMime.toLowerCase()
    if (tipo.includes('pdf')) {
      return <FaFilePdf className="text-3xl text-red-600" />
    } else if (tipo.includes('sheet') || tipo.includes('excel')) {
      return <FaFileExcel className="text-3xl text-[var(--color-primary)]" />
    } else if (tipo.includes('word') || tipo.includes('document')) {
      return <FaFileWord className="text-3xl text-blue-500" />
    } else if (tipo.includes('presentation') || tipo.includes('powerpoint')) {
      return <FaFilePowerpoint className="text-3xl text-orange-500" />
    } else {
      return <FaFile className="text-3xl text-gray-400" />
    }
  }

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDownload = async (archivo: Archivo) => {
    try {
      await downloadArchivo(archivo.id, archivo.nombre_archivo, archivo.tipo_mime)
    } catch (error) {
      console.error('Error al descargar archivo:', error)
    }
  }

  const handleUpload = () => {
    setShowModal(true)
  }

  const handleEdit = (archivo: Archivo) => {
    setArchivoSeleccionado(archivo)
    setShowEditModal(true)
  }

  const handleDelete = async (archivo: Archivo) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${archivo.nombre_archivo}"?`)) {
      try {
        await deleteArchivo(archivo.id)
        const [archivosPropios, archivosCompartidos] = await Promise.all([
          getArchivos(),
          getArchivosCompartidos()
        ])
        setArchivosDelCliente([
          ...archivosPropios.results,
          ...archivosCompartidos
        ])
        alert('Archivo eliminado exitosamente')
      } catch (error) {
        console.error('Error al eliminar archivo:', error)
        alert('Error al eliminar el archivo')
      }
    }
  }

  const handleSuccess = async () => {
    try {
      const [archivosPropios, archivosCompartidos] = await Promise.all([
        getArchivos(),
        getArchivosCompartidos()
      ])
      setArchivosDelCliente([
        ...archivosPropios.results,
        ...archivosCompartidos
      ])
      console.log('Archivo procesado exitosamente')
    } catch (error) {
      console.error('Error al recargar archivos:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-light-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-dark-gray)] mb-2">
              Mis Archivos
            </h1>
            <p className="text-gray-600">Archivos propios y documentos compartidos</p>
          </div>
          <button
            onClick={handleUpload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-[#6fb33d] hover:transform hover:-translate-y-0.5 hover:shadow-lg"
            title="Subir nuevo archivo"
          >
            <FaUpload />
            <span>Subir Archivo</span>
          </button>
        </div>

        {archivosDelCliente.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-xl text-gray-600 mb-2">No tienes archivos disponibles</p>
            <p className="text-sm text-gray-500">Los archivos subidos aparecerán aquí</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-dark-gray)] text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider w-16">Tipo</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Nombre del Archivo</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Fecha de Carga</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider w-36">Origen</th>
                    <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider w-48">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {archivosDelCliente.map((archivo: Archivo) => {
                    const esPropio = archivo.usuario_compartido === null
                    return (
                      <tr key={archivo.id} className="hover:bg-[var(--color-light-green)] transition-colors border-b border-gray-200">
                        <td className="px-4 py-4 text-center">
                          {getFileIcon(archivo.tipo_mime)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-semibold text-[var(--color-dark-gray)] max-w-xs break-words">
                            {archivo.nombre_archivo}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {formatFecha(archivo.fecha_subida)}
                        </td>
                        <td className="px-4 py-4">
                          {esPropio ? (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-600 border border-blue-600">
                              Cliente
                            </span>
                          ) : (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-green-100 text-[var(--color-primary)] border border-[var(--color-primary)]">
                              Empresa
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {esPropio && (
                              <button
                                onClick={() => handleEdit(archivo)}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-md"
                                title="Editar"
                              >
                                <FaEdit className="text-lg" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDownload(archivo)}
                              className="p-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#6fb33d] transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-md"
                              title="Descargar"
                            >
                              <FaDownload className="text-lg" />
                            </button>
                            {esPropio && (
                              <button
                                onClick={() => handleDelete(archivo)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-md"
                                title="Eliminar"
                              >
                                <FaTrash className="text-lg" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Subir Archivo</h2>
              <p className="text-gray-600 mb-4">Modal de formulario pendiente de implementar</p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {showEditModal && archivoSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Editar Archivo</h2>
              <p className="text-gray-600 mb-4">Editando: {archivoSeleccionado.nombre_archivo}</p>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setArchivoSeleccionado(null)
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
