import React, { useState, useRef } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import type { ArchivoUploadDataExtended } from '@/types';
import type { Cliente } from '@/api/models';
import type {ClienteSimple} from '@/api/models';

interface ArchivoFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ArchivoUploadDataExtended) => void;
  clientes?: ClienteSimple[];
  initialData?: Partial<ArchivoUploadDataExtended>;
  isEdit?: boolean;
}

const ArchivoFormModal: React.FC<ArchivoFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  clientes,
  initialData = {},
  isEdit = false,
}) => {
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const [descripcion, setDescripcion] = useState(initialData.descripcion || '');
  const [compartirCon, setCompartirCon] = useState<number | ''>(
    initialData.compartir_con && initialData.compartir_con.length > 0 ? initialData.compartir_con[0] : ''
  );
  const [isPublic, setIsPublic] = useState(initialData.is_public || false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userType, setUserType] = useState<number | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedType = localStorage.getItem('user_type');
      setUserType(storedType ? Number(storedType) : null);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit && !file) {
      alert('Selecciona un archivo.');
      return;
    }
    // Para clientes, no enviar compartir_con ni is_public si no corresponde
    const data: ArchivoUploadDataExtended = {
      archivo: file as File,
      nombre,
      descripcion,
      compartir_con: userType === 1 ? (compartirCon !== '' ? [compartirCon] : []) : [],
      is_public: userType === 1 ? isPublic : false,
    };
    onSubmit(data);
    onClose();
  };

  const handleCompartirConChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setCompartirCon(value);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Archivo' : 'Subir Archivo'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Nombre</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Descripción</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            rows={2}
          />
        </div>
        {!isEdit && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Archivo</label>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[var(--color-primary)] transition-colors bg-gray-50"
              onClick={() => fileInputRef.current?.click()}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
              role="button"
              aria-label="Seleccionar archivo"
            >
              <FaFileUpload className="text-4xl text-[var(--color-primary)] mb-2" />
              <span className="text-gray-600 mb-1">Haz clic o arrastra para seleccionar un archivo</span>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                required
              />
              {file && (
                <div className="mt-2 text-sm text-gray-600">
                  Archivo seleccionado: <span className="font-semibold">{file.name}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {userType === 1 && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Compartir con usuario</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={compartirCon === '' ? '' : compartirCon}
              onChange={handleCompartirConChange}
            >
              <option value="">No compartir</option>
              {clientes && clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.razonSocial} ({cliente.rut})
                </option>
              ))}
            </select>
          </div>
        )}
        {userType === 1 && (
          <div className="mb-4 flex items-center gap-2">
            <label htmlFor="isPublic" className="text-gray-700 font-semibold mr-2">
              Visible para el cliente
            </label>
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${isPublic ? 'bg-green-500' : 'bg-gray-300'}`}
              aria-pressed={isPublic}
              aria-label="Cambiar visibilidad"
              id="isPublic"
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${isPublic ? 'translate-x-6' : ''}`}
              />
            </button>
          </div>
        )}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[#6fb33d] cursor-pointer"
          >
            {isEdit ? 'Guardar Cambios' : 'Subir Archivo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArchivoFormModal;
