import React from 'react';
import { FaTree, FaLeaf, FaGlobeAmericas, FaTint } from 'react-icons/fa';

interface HuellaStatsProps {
  totalPeso: number;
  calcularHuellaCarbono: (totalPesoKg: number) => { valor: string; unidad: string; arboles: number };
  calcularHuellaEcologica: (totalPesoKg: number) => { valor: string; unidad: string; superficie: number };
  calcularHuellaHidrica: (totalPesoKg: number) => { valor: string; unidad: string; agua: number };
}

const HuellaStats: React.FC<HuellaStatsProps> = ({
  totalPeso,
  calcularHuellaCarbono,
  calcularHuellaEcologica,
  calcularHuellaHidrica,
}) => {
  const huellaCarbono = calcularHuellaCarbono(totalPeso);
  const huellaEcologica = calcularHuellaEcologica(totalPeso);
  const huellaHidrica = calcularHuellaHidrica(totalPeso);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Huella de Carbono */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Impacto Ambiental</p>
          <h3 className="text-2xl font-extrabold text-gray-800">Huella de Carbono</h3>
          <p className="text-sm text-green-500 font-semibold mt-1">{huellaCarbono.valor} {huellaCarbono.unidad}</p>
          <span className="inline-flex mt-2 items-center gap-2 text-green-700 font-semibold bg-green-50 rounded-lg px-4 py-2 text-sm shadow-sm">
            <FaTree className="text-green-500" />
            Equivale a {huellaCarbono.arboles} árboles salvados
          </span>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xl">
          <FaLeaf />
        </div>
      </div>
      {/* Huella Ecológica */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Sostenibilidad</p>
          <h3 className="text-2xl font-extrabold text-gray-800">Huella Ecológica</h3>
          <p className="text-sm text-blue-500 font-semibold mt-1">{huellaEcologica.valor} {huellaEcologica.unidad}</p>
          <span className="inline-flex items-center gap-2 text-blue-700 font-semibold bg-stone-500 rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
            <FaGlobeAmericas className="text-blue-500" />
            <span className="text-stone-800">Superficie recuperada: {huellaEcologica.superficie} m²</span>
          </span>
        </div>
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl">
          <FaGlobeAmericas />
        </div>
      </div>
      {/* Huella Hídrica */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">Recursos Hídricos</p>
          <h3 className="text-2xl font-extrabold text-gray-800">Huella Hídrica</h3>
          <p className="text-sm text-blue-500 font-semibold mt-1">{huellaHidrica.valor} {huellaHidrica.unidad}</p>
          <span className="inline-flex items-center gap-2 text-blue-700 font-semibold bg-blue-50 rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
            <FaTint className="text-blue-500" />
            Agua ahorrada: {huellaHidrica.agua.toLocaleString()} L
          </span>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl">
          <FaTint />
        </div>
      </div>
    </div>
  );
};

export default HuellaStats;
