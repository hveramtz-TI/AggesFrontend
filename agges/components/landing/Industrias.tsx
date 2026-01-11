'use client'

import React from 'react'
import industriasData from '@/data/industrias.json'

const Industrias = () => {
  return (
    <section 
      className="py-20 px-8 max-md:py-12 max-md:px-6 max-[480px]:py-8 max-[480px]:px-4" 
      style={{ backgroundColor: 'var(--color-light-green)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-12 max-md:mb-8">
          <h2 
            className="text-[2.5rem] max-md:text-[2rem] mb-4 font-bold" 
            style={{ color: 'var(--color-dark-gray)' }}
          >
            Sectores Productivos donde Operamos
          </h2>
          <p 
            className="text-[1.125rem] max-w-[600px] mx-auto leading-relaxed"
            style={{ color: 'var(--color-dark-gray)', opacity: 0.7 }}
          >
            Soluciones especializadas para diferentes industrias
          </p>
        </div>
        
        {/* Grid de industrias */}
        <div 
          className="grid gap-8 max-md:gap-6 max-[480px]:gap-4 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {industriasData.map((industria) => (
            <div 
              key={industria.id}
              className="bg-white rounded-xl p-8 max-md:p-6 max-[480px]:p-5 text-center transition-all duration-300 border-2 w-full max-w-[600px]"
              style={{ borderColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)'
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(131, 202, 74, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Imagen/Emoji */}
              <div className="text-[4rem] max-md:text-[3rem] max-[480px]:text-[2.5rem] mb-4 max-[480px]:mb-3">
                {industria.image}
              </div>
              
              {/* Nombre */}
              <h3 
                className="text-[1.5rem] max-md:text-[1.25rem] max-[480px]:text-[1.1rem] font-bold mb-3 max-[480px]:mb-2"
                style={{ color: 'var(--color-dark-gray)' }}
              >
                {industria.name}
              </h3>
              
              {/* Descripción */}
              <p 
                className="text-[0.95rem] max-md:text-[0.9rem] max-[480px]:text-[0.85rem] leading-[1.6] max-[480px]:leading-[1.5]"
                style={{ color: 'var(--color-dark-gray)', opacity: 0.7 }}
              >
                {industria.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Industrias