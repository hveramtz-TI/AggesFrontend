// Type guard para asegurar solo objetos Archivo
function isArchivo(obj: any): obj is Archivo {
  return obj && typeof obj === 'object' &&
    'archivo' in obj &&
    'tipo_mime' in obj &&
    'tamaño_bytes' in obj &&
    'visibilidad' in obj &&
    'fecha_carga' in obj;
}
'use client'
import { useState, useEffect } from 'react'
import { FaUpload } from 'react-icons/fa'
import { useArchivos } from '@/hooks'
import type { Archivo, User } from '@/api'
import ArchivoFormModal from '@/components/ArchivoFormModal'
import SearchBar from '@/components/common/SearchBar'
import Pagination from '@/components/common/Pagination'
import ArchivosTable from './ArchivosTable'

import { FaFilePdf, FaFileExcel, FaFileWord, FaFilePowerpoint, FaFile } from 'react-icons/fa'

function getFileIcon(tipo: string) {
  const tipoLower = tipo.toLowerCase()
  if (tipoLower.includes('pdf')) return <FaFilePdf className="text-3xl text-red-600" />
  if (tipoLower.includes('excel') || tipoLower.includes('sheet')) return <FaFileExcel className="text-3xl text-[var(--color-primary)]" />
  if (tipoLower.includes('word') || tipoLower.includes('document')) return <FaFileWord className="text-3xl text-blue-500" />
  if (tipoLower.includes('powerpoint') || tipoLower.includes('presentation')) return <FaFilePowerpoint className="text-3xl text-orange-500" />
  return <FaFile className="text-3xl text-gray-400" />
}

function formatFecha(fecha?: string) {
  if (!fecha) return ''
  const d = new Date(fecha)
  return d.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ArchivosClientPage() {
  const { getArchivos, getArchivosCompartidos, uploadArchivo, editArchivo, downloadArchivo, deleteArchivo } = useArchivos()
  const [archivosDelCliente, setArchivosDelCliente] = useState<Archivo[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<Archivo | null>(null)

  // Inicializar userId directamente desde localStorage
  const [userId] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          const user: User = JSON.parse(userStr)
          return user.id
        } catch (error) {
          console.error('Error al parsear usuario:', error)
        }
      }
    }
    return null
  })

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        const [archivosPropios, archivosCompartidos] = await Promise.all([
          getArchivos(),
          getArchivosCompartidos()
        ])
        // Combinar y eliminar duplicados basándonos en el ID
        const todosLosArchivos = [...archivosPropios.results, ...archivosCompartidos]
        const archivosUnicos = Array.from(
          new Map(todosLosArchivos.map(archivo => [archivo.id, archivo])).values()
        )
        setArchivosDelCliente(archivosUnicos.filter(isArchivo))
      } catch (error) {
        console.error('Error al obtener archivos:', error)
      }
    }
    fetchArchivos()
  }, [getArchivos, getArchivosCompartidos])

  // Handlers
  const handleUpload = () => setShowModal(true)
  const handleEdit = (archivo: Archivo) => {
    setArchivoSeleccionado(archivo)
    setShowEditModal(true)
  }
  const handleDownload = async (archivo: Archivo) => {
    try {
      await downloadArchivo(archivo.id, archivo.nombre_archivo, archivo.tipo_mime)
    } catch (error) {
      console.error('Error al descargar archivo:', error)
    }
  }

  const handleDelete = async (archivo: Archivo) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${archivo.nombre_archivo}"?`)) {
      try {
        await deleteArchivo(archivo.id)
        await handleSuccess()
        alert('Archivo eliminado exitosamente')
      } catch (error) {
        console.error('Error al eliminar archivo:', error)
        alert('Error al eliminar el archivo')
      }
    }
  }
  const handleSuccess = async () => {
    // Recargar archivos después de una acción exitosa
    try {
      const [archivosPropios, archivosCompartidos] = await Promise.all([
        getArchivos(),
        getArchivosCompartidos()
      ])
      const todosLosArchivos = [...archivosPropios.results, ...archivosCompartidos]
      const archivosUnicos = Array.from(
        new Map(todosLosArchivos.map(archivo => [archivo.id, archivo])).values()
      )
      setArchivosDelCliente(archivosUnicos.filter(isArchivo))
    } catch (error) {
      console.error('Error al recargar archivos:', error)
    }
  }

  // Filtrado y paginación
  const archivosFiltrados = archivosDelCliente.filter(a =>
    a.nombre_archivo?.toLowerCase().includes(busqueda.toLowerCase())
  )
  const totalPages = Math.ceil(archivosFiltrados.length / pageSize) || 1
  const paginatedArchivos = archivosFiltrados.slice((currentPage - 1) * pageSize, currentPage * pageSize)

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

        <SearchBar
          value={busqueda}
          onChange={value => {
            setBusqueda(value)
            setCurrentPage(1)
          }}
          placeholder="Buscar por nombre de archivo..."
          className="mb-6"
        />

        <ArchivosTable
          archivos={paginatedArchivos}
          getFileIcon={getFileIcon}
          formatFecha={formatFecha}
          onEdit={handleEdit}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {showModal && (
          <ArchivoFormModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={async (data) => {
              try {
                await uploadArchivo(
                  data.archivo,
                  data.nombre || data.archivo?.name,
                  data.descripcion,
                  undefined,
                  true
                )
                await handleSuccess()
                setShowModal(false)
              } catch (error) {
                console.error('Error al subir archivo:', error)
              }
            }}
          />
        )}

        {showEditModal && archivoSeleccionado && (
          <ArchivoFormModal
            open={showEditModal}
            onClose={() => {
              setShowEditModal(false)
              setArchivoSeleccionado(null)
            }}
            onSubmit={async (data) => {
              try {
                await editArchivo(archivoSeleccionado.id, {
                  nombre: data.nombre,
                  descripcion: data.descripcion
                })
                await handleSuccess()
                setShowEditModal(false)
                setArchivoSeleccionado(null)
              } catch (error) {
                console.error('Error al editar archivo:', error)
              }
            }}
            initialData={{
              nombre: archivoSeleccionado.nombre_archivo,
              descripcion: archivoSeleccionado.descripcion || ''
            }}
            isEdit={true}
          />
        )}
      </div>
    </div>
  )
}