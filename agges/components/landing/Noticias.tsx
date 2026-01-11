'use client'

import React from 'react'
import noticiasData from '@/data/noticias.json'

const Noticias = () => {
  // Formatear fecha
  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <section className="w-full py-24 px-8" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Título de sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 font-bold" style={{ color: 'var(--color-dark-gray)' }}>
            Últimas Noticias
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full mb-6"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-dark-gray)', opacity: 0.8 }}
          >
            Mantente informado sobre nuestros logros e innovaciones
          </p>
        </div>
        
        {/* Grid de noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticiasData.slice(0, 6).map((noticia) => (
            <article 
              key={noticia.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 group cursor-pointer"
              style={{ borderColor: 'var(--color-light-gray)' }}
            >
              {/* Imagen */}
              <div className="relative h-56 overflow-hidden" style={{ backgroundColor: 'var(--color-light-gray)' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl opacity-30">📰</span>
                </div>
                {/* Categoría badge */}
                <div 
                  className="absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {noticia.categoria}
                </div>
              </div>
              
              {/* Contenido */}
              <div className="p-6">
                {/* Fecha */}
                <p 
                  className="text-sm mb-3 font-medium"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {formatearFecha(noticia.fecha)}
                </p>
                
                {/* Título */}
                <h3 
                  className="text-xl font-bold mb-3 line-clamp-2 group-hover:underline"
                  style={{ color: 'var(--color-dark-gray)' }}
                >
                  {noticia.titulo}
                </h3>
                
                {/* Descripción */}
                <p 
                  className="text-base leading-relaxed mb-4 line-clamp-3"
                  style={{ color: 'var(--color-dark-gray)', opacity: 0.8 }}
                >
                  {noticia.descripcion}
                </p>
                
                {/* Link */}
                <button 
                  className="font-bold text-base transition-colors duration-300 hover:underline flex items-center gap-2 group-hover:gap-3"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Leer más
                  <span className="transition-transform duration-300">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
        
        {/* Ver todas las noticias */}
        <div className="text-center mt-12">
          <button 
            className="px-8 py-4 rounded-full font-bold text-white text-lg hover:opacity-90 transition-all duration-300 hover:shadow-xl"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Ver todas las noticias
          </button>
        </div>
      </div>
    </section>
  )
}

export default Noticias
