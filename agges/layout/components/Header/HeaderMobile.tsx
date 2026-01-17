'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full relative h-auto">
      {/* Header Content */}
      <div className="flex justify-between items-center p-4 bg-white relative z-[1001]">
        {/* Logo */}
        <div className="relative h-[30px] w-auto">
          <Image
            src="/logo.svg"
            alt="AGGES Logo"
            width={100}
            height={30}
            className="h-[30px] w-auto object-contain"
            priority
          />
        </div>
        
        {/* Hamburger Button */}
        <button 
          className="flex flex-col justify-around w-[30px] h-[25px] bg-transparent border-none cursor-pointer p-0 z-[1002]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span 
            className="w-full h-[3px] rounded-sm transition-all duration-300"
            style={{ backgroundColor: 'var(--color-dark-gray)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-dark-gray)'
            }}
          ></span>
          <span 
            className="w-full h-[3px] rounded-sm transition-all duration-300"
            style={{ backgroundColor: 'var(--color-dark-gray)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-dark-gray)'
            }}
          ></span>
          <span 
            className="w-full h-[3px] rounded-sm transition-all duration-300"
            style={{ backgroundColor: 'var(--color-dark-gray)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-dark-gray)'
            }}
          ></span>
        </button>
      </div>
      
      {/* Menu */}
      {isMenuOpen && (
        <nav 
          className="absolute top-full left-0 right-0 flex flex-col p-4 border-t shadow-lg z-[1000] animate-slideDown"
          style={{ 
            backgroundColor: 'var(--color-light-gray)',
            borderColor: 'var(--color-dark-gray)'
          }}
        >
          <Link
            href="/login"
            onClick={() => setIsMenuOpen(false)}
            className="px-6 py-3 rounded text-white text-base font-medium transition-all duration-300 w-full text-center"
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
      )}
      
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease;
        }
      `}</style>
    </div>
  )
}

export default HeaderMobile
