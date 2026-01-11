'use client'

import React from 'react'
import Image from 'next/image'
import clientesData from '@/data/clientes.json'

const Clientes = () => {
  return (
    <section className="w-full py-24 px-8" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl mb-4 font-bold"
            style={{ color: 'var(--color-dark-gray)' }}
          >
            Empresas líderes que han confiado en nuestras soluciones
          </h2>
        </div>
        
        {/* Grid de clientes */}
        <div 
          className="grid gap-8 items-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}
        >
          {clientesData.map((cliente) => (
            <div 
              key={cliente.id}
              className="flex flex-col items-center justify-center p-8 rounded-xl transition-all duration-300 min-h-[150px]"
              style={{ backgroundColor: '#f9f9f9' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Logo */}
              <div 
                className="mb-4 w-full h-20 flex items-center justify-center transition-all duration-300"
                style={{ filter: 'grayscale(100%)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%)'
                }}
              >
                <Image
                  src={cliente.logo}
                  alt={cliente.name}
                  width={200}
                  height={80}
                  className="max-w-full max-h-full object-contain"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '80px' }}
                />
              </div>
              
              {/* Nombre del cliente */}
              <p 
                className="text-base font-semibold text-center hidden md:block"
                style={{ color: 'var(--color-dark-gray)' }}
              >
                {cliente.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clientes
