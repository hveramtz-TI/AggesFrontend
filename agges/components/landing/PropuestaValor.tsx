'use client'

import React from 'react'
import Image from 'next/image'

const PropuestaValor = () => {
  const propuestas = [
    {
      icon: '/1.webp',
      title: 'Aporte al Desarrollo Comunitario',
      description: 'Impulsamos el desarrollo de las comunidades a través de la donación de equipamiento urbano fabricado con materiales reciclados, creando espacios de encuentro y convivencia.'
    },
    {
      icon: '/2.webp',
      title: 'Apoyo en la Materialización de Compromisos Sostenibles',
      description: 'Acompañamos a las organizaciones en el cumplimiento real y efectivo de sus compromisos de reciclaje, transformando la intención en acción.'
    },
    {
      icon: '/3.webp',
      title: 'Aumento de la Vinculación Social-Corporativa',
      description: 'Potenciamos la conexión de las empresas con su entorno, construyendo confianza y reforzando su imagen como organizaciones responsables y coherentes con sus valores.'
    }
  ]

  const highlightFirstA = (text: string) => {
    const firstAIndex = text.indexOf('A')
    if (firstAIndex === 0) {
      return (
        <>
          <span style={{ color: '#22c55e', fontWeight: 'var(--font-weight-bold)' }}>A</span>
          {text.slice(1)}
        </>
      )
    }
    return text
  }

  return (
    <section className="w-full py-20 px-8" style={{ backgroundColor: 'var(--color-light-green)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl mb-4 font-bold"
            style={{ color: 'var(--color-dark-gray)' }}
          >
            Nuestra Propuesta de Valor
          </h2>
          <p 
            className="text-lg max-w-[600px] mx-auto"
            style={{ color: 'var(--color-dark-gray)', opacity: 0.7 }}
          >
            Transformamos la manera en que gestionas tus proyectos
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propuestas.map((propuesta, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 text-center"
              style={{ 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)'
              }}
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center items-center h-[155px]">
                <Image
                  src={propuesta.icon}
                  alt={propuesta.title}
                  width={200}
                  height={155}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              {/* Title */}
              <h3 
                className="text-2xl mb-3 font-bold"
                style={{ color: 'var(--color-dark-gray)' }}
              >
                {highlightFirstA(propuesta.title)}
              </h3>
              
              {/* Description */}
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-dark-gray)', opacity: 0.7 }}
              >
                {propuesta.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropuestaValor
