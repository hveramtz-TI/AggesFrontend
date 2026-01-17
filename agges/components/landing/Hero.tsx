'use client'

import React from 'react'
import Image from 'next/image'

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
        <Image 
          src="/logo.webp" 
          alt="Logo Agges"
          width={1000}
          height={1000}
          className="mb-6"
        />
      </div>
    </section>
  )
}

export default Hero
