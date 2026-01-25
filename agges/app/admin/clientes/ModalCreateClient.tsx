import React from 'react'
import Modal from '@/components/Modal'

interface ModalCreateClientProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  formData: {
    username: string;
    rut: string;
    email: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalCreateClient: React.FC<ModalCreateClientProps> = ({ open, onClose, onCreate, formData, onFormChange }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      type="formulario"
      title="Crear Cliente"
      formContent={
        <form className="flex flex-col content-center items-center gap-4">
          <label className="text-(--color-dark-gray) font-medium flex flex-col content-center items-center">Nombre de usuario
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={onFormChange}
              className="mt-1 md:w-90 px-3 py-2 rounded border border-(--color-primary) focus:outline-none focus:border-(--color-primary)"
              required
            />
          </label>
          <label className="text-(--color-dark-gray) flex flex-col content-center items-center font-medium">Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onFormChange}
              className="mt-1 md:w-90 px-3 py-2 rounded border border-(--color-primary) focus:outline-none focus:border-(--color-primary)"
              required
            />
          </label>
          <label className="text-(--color-dark-gray) flex flex-col content-center items-center font-medium">RUT
            <input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={onFormChange}
              className="mt-1 md:w-90 px-3 py-2 rounded border border-(--color-primary) focus:outline-none focus:border-(--color-primary)"
              required
            />
          </label>
        </form>
      }
      onCreate={onCreate}
    />
  )
}

export default ModalCreateClient