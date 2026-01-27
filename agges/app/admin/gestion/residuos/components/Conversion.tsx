import React, { useState, useEffect } from 'react';
import conversionMateriales from '@/data/conversionMateriales.json';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


interface ConversionProps {
  expandAll?: boolean;
}

const Conversion: React.FC<ConversionProps> = ({ expandAll = false }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (expandAll) {
      // Expande todas las cards
      const allExpanded: { [key: string]: boolean } = {};
      conversionMateriales.forEach((material: any) => {
        allExpanded[material.id] = true;
      });
      setExpanded(allExpanded);
    }
  }, [expandAll]);

  const handleToggle = (key: string) => {
    if (expandAll) return; // No permitir colapsar si expandAll está activo
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className='flex flex-col items-center justify-center mb-6 p-6'>
      <h2 className='text-xl font-bold text-[var(--foreground)] mb-4'>Conversión de Materiales</h2>
      <div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full'
      >
        {conversionMateriales.map((material: any) => {
          const isOpen = expandAll ? true : expanded[material.id];
          return (
            <div
              key={material.id}
              className={
                isOpen
                  ? 'bg-[var(--card-bg)] rounded-xl shadow p-4 flex flex-col items-center w-full border border-[var(--card-border)] col-span-full transition-all duration-300'
                  : 'bg-[var(--card-bg)] rounded-xl shadow p-4 flex flex-col items-center border border-[var(--card-border)] transition-all duration-300 min-w-[220px] max-w-[280px] mx-auto'
              }
              style={isOpen ? { width: '100%' } : { width: '100%', maxWidth: 280 }}
            >
              <button
                className='w-full flex items-center justify-center focus:outline-none px-2 py-2 rounded-lg bg-[var(--chip-bg)] hover:bg-[var(--color-light-gray)] transition-colors border border-[var(--card-border)] mb-2'
                onClick={() => handleToggle(material.id)}
              >
                <span className='text-lg font-bold text-[var(--color-primary)] flex items-center gap-2'>
                  {material.nombre}
                </span>
                <span className='ml-2 text-[var(--muted-text)]'>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {isOpen && (
                <div className='w-full mt-4 flex flex-row flex-wrap gap-2'>
                  {material.conversiones.map((conv: any, idx: number) => (
                    <div key={idx} className="bg-[var(--chip-bg)] rounded-2xl shadow-sm p-4 flex flex-col items-start justify-between w-full border border-[var(--card-border)] min-w-[180px] max-w-[320px]">
                      <span className="text-xs uppercase font-bold text-[var(--color-primary)] mb-1 tracking-wider">{conv.destino}</span>
                      <h3 className="text-lg font-extrabold text-[var(--foreground)]">{material.nombre} → {conv.destino}</h3>
                      <p className="text-sm text-[var(--color-primary)] font-semibold mt-1">Cantidad: 1000 kg</p>
                      <span className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold bg-[var(--color-light-green)] rounded-lg px-4 py-2 text-sm shadow-sm mt-2">
                        Conversión: {calcularConversion(conv.formula, 1000)} kg
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // Evalúa la fórmula tipo "kg * 0.8" para una cantidad dada
  function calcularConversion(formula: string, cantidad: number): number {
    try {
      // Reemplaza 'kg' por la cantidad y evalúa la expresión
      const expr = formula.replace(/kg/g, cantidad.toString());
      // eslint-disable-next-line no-eval
      const resultado = eval(expr);
      return Math.round(resultado * 100) / 100;
    } catch {
      return 0;
    }
  }
};
export default Conversion;