'use client'

import React from 'react'

const Hero = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center relative overflow-hidden p-8">
      {/* Gradiente de fondo */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #5fa836 100%)'
        }}
      />
      
      {/* Video de fondo */}
      <video 
        className="absolute top-1/2 left-1/2 min-w-full h-screen size-auto object-cover -translate-x-1/2 -translate-y-1/2 z-0"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/Agges2.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[rgba(41,71,17,0.5)] z-[1]" />
      
      {/* Contenido */}
      <div className="max-w-[800px] w-full flex flex-col items-center justify-center relative z-[2] text-center">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl md:text-[4rem] font-bold leading-tight m-0 text-white">
            Bienvenido a Nuestra Plataforma
          </h1>
          
          <p className="text-lg leading-relaxed opacity-95 m-0 max-w-[600px] text-white">
            Gestiona tus proyectos de manera eficiente y sostenible
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/login" 
              className="px-8 py-3.5 rounded-lg text-base font-semibold no-underline inline-block transition-all duration-300 bg-white hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
              style={{ color: 'var(--color-primary)' }}
            >
              Iniciar Sesión
            </a>
            
            <a 
              href="/register" 
              className="px-8 py-3.5 rounded-lg text-base font-semibold no-underline inline-block transition-all duration-300 bg-transparent text-white border-2 border-white hover:bg-white hover:-translate-y-0.5"
              style={{ 
                '--hover-color': 'var(--color-primary)'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white'
              }}
            >
              Registrarse
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
