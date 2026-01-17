'use client'
import { useState, useEffect } from 'react'
import { FaFilePdf, FaFileExcel, FaFileWord, FaFilePowerpoint, FaFile, FaUpload } from 'react-icons/fa'
import { useArchivos, useClientes } from '@/hooks'
import type { Archivo } from '@/api/models'
import ArchivoFormModal from '@/components/ArchivoFormModal'

import ArchivosTable from './ArchivosTable'
import Pagination from '@/components/common/Pagination'
import SearchBar from '@/components/common/SearchBar'

export default function ArchivosAdminPage() {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<Archivo | null>(null)
  const [archivos, setArchivos] = useState<Archivo[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [clientes, setClientes] = useState([])
  // Obtener clientes para el select de compartir
  const { getClientes } = useClientes();
  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data || []);
      } catch (error) {
        setClientes([]);
      }
    };
    cargarClientes();
  }, [getClientes]);

  const { getArchivos, loading: loadingArchivos, downloadArchivo, deleteArchivo, uploadArchivo, editArchivo, downloading, error } = useArchivos()

  // Cargar archivos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const responseArchivos = await getArchivos()
        setArchivos(responseArchivos.results || [])
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    }

    cargarDatos()
  }, [])

  const getFileIcon = (tipo: string) => {
    const tipoLower = tipo.toLowerCase()
    if (tipoLower.includes('pdf')) {
      return <FaFilePdf className="text-3xl text-red-600" />
    } else if (tipoLower.includes('excel') || tipoLower.includes('spreadsheet')) {
      return <FaFileExcel className="text-3xl text-[var(--color-primary)]" />
    } else if (tipoLower.includes('word') || tipoLower.includes('document')) {
      return <FaFileWord className="text-3xl text-blue-500" />
    } else if (tipoLower.includes('powerpoint') || tipoLower.includes('presentation')) {
      return <FaFilePowerpoint className="text-3xl text-orange-500" />
    }
    return <FaFile className="text-3xl text-gray-400" />
  }

  const formatFecha = (fecha?: string) => {
    if (!fecha) return 'N/A'
    const date = new Date(fecha)
    if (isNaN(date.getTime())) return 'N/A'
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const handleDownload = async (archivo: Archivo) => {
    setDownloadingId(archivo.id)
    try {
      await downloadArchivo(archivo.id, archivo.nombre_archivo, archivo.tipo_mime)
    } catch (error) {
      alert('Error al descargar archivo')
      console.error('Error al descargar archivo:', error)
    } finally {
      setDownloadingId(null)
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
        // Recargar la lista después de eliminar y resetear página
        const responseArchivos = await getArchivos()
        setArchivos(responseArchivos.results || [])
        setCurrentPage(1)
        alert('Archivo eliminado exitosamente')
      } catch (error) {
        console.error('Error al eliminar archivo:', error)
        alert('Error al eliminar el archivo')
      }
    }
  }

  const handleSuccess = async () => {
    // Recargar la lista de archivos después de subir/editar uno y resetear página
    try {
      const responseArchivos = await getArchivos()
      setArchivos(responseArchivos.results || [])
      setCurrentPage(1)
    } catch (error) {
      console.error('Error al recargar archivos:', error)
    }
  }

  // Filtrado y paginación
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const archivosFiltrados = archivos.filter(a =>
    a.nombre_archivo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    a.nombre_usuario_compartido?.toLowerCase().includes(busqueda.toLowerCase())
  )
  const totalPages = Math.ceil(archivosFiltrados.length / pageSize) || 1
  const paginatedArchivos = archivosFiltrados.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Eliminado el useEffect que reseteaba la página

  return (
    <div className="bg-[var(--color-light-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-dark-gray)] mb-2">
              Gestión de Archivos
            </h1>
            <p className="text-gray-600">Administra documentos compartidos con clientes</p>
          </div>
          <button
            onClick={handleUpload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-[#6fb33d] hover:transform hover:-translate-y-0.5 hover:shadow-lg"
            title="Subir y compartir archivo"
          >
            <FaUpload />
            <span>Subir y Compartir</span>
          </button>
        </div>

        {/* Barra de búsqueda */}
        <SearchBar
          value={busqueda}
          onChange={value => {
            setBusqueda(value)
            setCurrentPage(1)
          }}
          placeholder="Buscar por nombre de archivo o cliente..."
          className="mb-6"
        />

        {/* Loading State */}
        {loadingArchivos ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-600">Cargando archivos...</div>
          </div>
        ) : archivosFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-600">No hay archivos disponibles.</div>
          </div>
        ) : (
          <>
            <ArchivosTable
              archivos={paginatedArchivos}
              getFileIcon={getFileIcon}
              formatFecha={formatFecha}
              onEdit={handleEdit}
              onDownload={handleDownload}
              onDelete={handleDelete}
              downloadingId={downloadingId}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {/* Modal para subir archivo */}
        <ArchivoFormModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={async (data) => {
            try {
              // Solo se permite un usuario compartido (por compatibilidad backend)
              const usuarioCompartido = data.compartir_con && data.compartir_con.length > 0 ? data.compartir_con[0] : undefined;
              await uploadArchivo(
                data.archivo,
                data.nombre || data.archivo.name,
                data.descripcion,
                usuarioCompartido,
                data.is_public ?? true
              );
              await handleSuccess();
              setShowModal(false);
            } catch (e) {
              // Manejo de error opcional
            }
          }}
          clientes={clientes}
          isEdit={false}
        />

        {/* Modal para editar archivo */}
        <ArchivoFormModal
          open={showEditModal && !!archivoSeleccionado}
          onClose={() => {
            setShowEditModal(false);
            setArchivoSeleccionado(null);
          }}
          onSubmit={async (data) => {
            try {
              if (!archivoSeleccionado) return;
              const usuarioCompartido = data.compartir_con && data.compartir_con.length > 0 ? data.compartir_con[0] : undefined;
              await editArchivo(archivoSeleccionado.id, {
                nombre: data.nombre,
                descripcion: data.descripcion,
                usuario_compartido: usuarioCompartido,
                is_public: data.is_public,
              });
              await handleSuccess();
              setShowEditModal(false);
              setArchivoSeleccionado(null);
            } catch (e) {
              // Manejo de error opcional
            }
          }}
          clientes={clientes}
          initialData={archivoSeleccionado ? {
            nombre: archivoSeleccionado.nombre_archivo,
            descripcion: archivoSeleccionado.descripcion || '',
            compartir_con: archivoSeleccionado.usuario_compartido ? [archivoSeleccionado.usuario_compartido] : [],
            is_public: archivoSeleccionado.visibilidad,
          } : {}}
          isEdit={true}
        />
      </div>
    </div>
  )
}
