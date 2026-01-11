'use client'

import React from 'react'
import serviciosData from '@/data/servicios.json'

const Servicios = () => {
  return (
    <section className="py-20 px-8 max-[750px]:py-8" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-12">
          <h2 className="text-[2.5rem] max-md:text-[2rem] mb-4 font-bold" style={{ color: 'var(--color-dark-gray)' }}>
            Nuestros Servicios
          </h2>
          <p 
            className="text-[1.125rem] max-w-[600px] mx-auto leading-relaxed"
            style={{ color: 'var(--color-dark-gray)', opacity: 0.7 }}
          >
            Soluciones integrales para todas tus necesidades
          </p>
        </div>
        
        {/* Grid de servicios */}
        <div 
          className="grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2"
        >
          {serviciosData.map((servicio) => (
            <div 
              key={servicio.id}
              className="p-8 rounded-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6 h-full w-full max-w-[600px]"
              style={{ 
                backgroundColor: 'var(--color-light-green)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)'
              }}
            >
              {/* Icon */}
              <div className="text-[3rem] flex-shrink-0">
                {servicio.icon}
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-2 flex-1 min-w-0 text-center md:text-left">
                <h3 
                  className="text-[1.25rem] font-bold m-0 break-words"
                  style={{ color: 'var(--color-dark-gray)' }}
                >
                  {servicio.title}
                </h3>
                
                <p 
                  className="text-[0.95rem] leading-[1.5] m-0 break-words"
                  style={{ color: 'var(--color-dark-gray)', opacity: 0.7 }}
                >
                  {servicio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Servicios
