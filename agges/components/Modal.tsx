import React from 'react';
import { FaX } from 'react-icons/fa6';

type ModalType = 'alerta' | 'eliminacion' | 'formulario';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  type: ModalType;
  title: string;
  content?: string; // para alerta/eliminacion
  formContent?: React.ReactNode; // para formulario
  onAccept?: () => void; // para alerta
  onCreate?: () => void; // para formulario
}

const Modal: React.FC<ModalProps> = ({ open, onClose, type, title, content, formContent, onAccept, onCreate }) => {
  if (!open) return null;

  // Body content según tipo
  let body = null;
  if (type === 'alerta') {
    body = <p className="text-(--color-dark-gray) text-center">¿Estás seguro de {content}?</p>;
  } else if (type === 'eliminacion') {
    body = <p className="text-(--color-dark-gray) text-center">Se ha eliminado {content}</p>;
  } else if (type === 'formulario') {
    body = <div>{formContent}</div>;
  }

  // Footer según tipo
  let footer = null;
  if (type === 'alerta') {
    footer = (
      <button
        className="bg-(--color-primary) text-white px-6 py-2 rounded font-bold hover:bg-(--color-dark-gray) transition-colors"
        onClick={onAccept}
      >
        Aceptar
      </button>
    );
  } else if (type === 'formulario') {
    footer = (
      <button
        className="bg-(--color-primary) text-white px-6 py-2 rounded font-bold hover:bg-(--color-dark-gray) transition-colors cursor-pointer"
        onClick={onCreate}
      >
        Crear
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
      <div className="bg-(--color-white) max-w-[90vh] rounded-lg shadow-lg w-full max-w-md mx-4 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-bold text-(--color-dark-gray)">{title}</h2>
          <button onClick={onClose} className="text-(--color-dark-gray) hover:text-(--color-primary) p-1 rounded-full cursor-pointer" aria-label="Cerrar modal">
            <FaX size={20} />
          </button>
        </div>
        <hr className="border-t border-(--color-light-green)" />
        {/* Body */}
        <div className="px-6 py-6">{body}</div>
        {/* Footer */}
        {(type === 'alerta' || type === 'formulario') && <>
          <hr className="border-t border-(--color-light-green)" />
          <div className="px-6 py-4 flex justify-end">{footer}</div>
        </>}
      </div>
    </div>
  );
};

export default Modal;