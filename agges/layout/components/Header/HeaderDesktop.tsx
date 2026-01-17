'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeaderDesktop = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 w-full">
      {/* Logo */}
      <div className="relative h-[50px] w-auto">
        <Image
          src="/logo.svg"
          alt="AGGES Logo"
          width={150}
          height={50}
          className="h-[50px] w-auto object-contain"
          priority
        />
      </div>
      
      {/* Navegación */}
      <nav className="flex items-center gap-4">
        <Link 
          href="/login"
          className="px-6 py-3 rounded text-white text-base font-medium transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: 'var(--color-primary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-dark-gray)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
          }}
        >
          Acceso a Clientes
        </Link>
      </nav>
    </div>
  )
}

export default HeaderDesktop
