import React from 'react';
import materialEquivalents from '@/data/materialEquivalents.json';

const Conversion = () => {
  return (
    <div className='flex flex-col items-center justify-center mb-6 p-6'>
      <h2 className='text-xl font-bold text-amber-900 mb-4'>Conversión de Materiales</h2>
      <div className='grid grid-cols-1 gap-6 w-full'>
        {Object.entries(materialEquivalents).map(([key, material]: any, idx) => (
          <div key={key} className='bg-white rounded-xl shadow p-4 flex flex-col items-center'>
            <h3 className='text-lg font-bold text-amber-900 mb-2'>{material.label} {material.icon}</h3>
            <div className='w-full flex flex-roww gap-3'>
              {/* Reparación */}
              <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-start justify-between w-full">
                <span className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Reparación</span>
                <h3 className="text-lg font-extrabold text-gray-800">{material.label}</h3>
                <p className="text-sm text-amber-700 font-semibold mt-1">Cantidad: 1200 kg</p>
                <span className="inline-flex items-center gap-2 text-amber-900 font-semibold bg-amber-50 rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
                  Conversión: {Math.round(1200 * material.factor)} {material.unidad_destino}
                </span>
              </div>
              {/* Reciclaje */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-start justify-between w-full">
                <span className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Reciclaje</span>
                <h3 className="text-lg font-extrabold text-gray-800">{material.label}</h3>
                <p className="text-sm text-amber-700 font-semibold mt-1">Cantidad: 800 kg</p>
                <span className="inline-flex items-center gap-2 text-amber-900 font-semibold bg-amber-50 rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
                  Conversión: {Math.round(800 * material.factor)} {material.unidad_destino}
                </span>
              </div>
              {/* Economía Circular */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-start justify-between w-full">
                <span className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Economía Circular</span>
                <h3 className="text-lg font-extrabold text-gray-800">{material.label}</h3>
                <p className="text-sm text-amber-700 font-semibold mt-1">Cantidad: 500 kg</p>
                <span className="inline-flex items-center gap-2 text-amber-900 font-semibold bg-amber-50 rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
                  Conversión: {Math.round(500 * material.factor)} {material.unidad_destino}
                </span>
              </div>
              {/* Reuso */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-start justify-between w-full">
                <span className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Reuso</span>
                <h3 className="text-lg font-extrabold text-gray-800">{material.label}</h3>
                <p className="text-sm text-amber-700 font-semibold mt-1">Cantidad: 300 kg</p>
                <span className="inline-flex items-center gap-2 text-amber-900 font-semibold bg-amber-50 rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
                  Conversión: {Math.round(300 * material.factor)} {material.unidad_destino}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Conversion;