'use client'

import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaXTwitter, FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="w-full pt-12 pb-8 px-8" style={{ backgroundColor: 'var(--color-dark-gray)', color: 'var(--color-white)' }}>
      {/* Sección Superior */}
      <div className="max-w-[1400px] mx-auto mb-8">
        <div className="flex flex-wrap justify-around gap-8 mb-8">
          {/* Descripción */}
          <div className="flex-1 max-w-[400px]">
            <h3 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
              Sobre Nosotros
            </h3>
            <p className="leading-relaxed font-medium" style={{ color: 'var(--color-light-gray)' }}>
              Somos una empresa comprometida con la excelencia en servicios industriales,
              brindando soluciones innovadoras y de calidad para nuestros clientes.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12">
            {/* Servicios */}
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Servicios</h4>
              <ul className="list-none p-0 m-0 space-y-2">
                <li>
                  <Link href="#servicios" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Consultoría
                  </Link>
                </li>
                <li>
                  <Link href="#servicios" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Mantenimiento
                  </Link>
                </li>
                <li>
                  <Link href="#servicios" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link href="#servicios" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Empresa</h4>
              <ul className="list-none p-0 m-0 space-y-2">
                <li>
                  <Link href="#nosotros" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#equipo" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Equipo
                  </Link>
                </li>
                <li>
                  <Link href="#contacto" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#ubicacion" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Ubicación
                  </Link>
                </li>
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Recursos</h4>
              <ul className="list-none p-0 m-0 space-y-2">
                <li>
                  <Link href="#blog" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#casos" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Casos de Éxito
                  </Link>
                </li>
                <li>
                  <Link href="#documentacion" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Legal</h4>
              <ul className="list-none p-0 m-0 space-y-2">
                <li>
                  <Link href="#privacidad" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#terminos" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#cookies" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#licencias" className="no-underline font-medium transition-colors duration-300" style={{ color: 'var(--color-light-gray)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-light-gray)'}>
                    Licencias
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Separador */}
      <hr className="border-0 border-t border-white/20 my-8 max-w-[1400px] mx-auto" />

      {/* Redes Sociales */}
      <div className="flex justify-center items-center gap-6 py-6 flex-wrap max-w-[1400px] mx-auto">
        <a 
          href="#facebook" 
          aria-label="Facebook"
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl no-underline transition-all duration-300"
          style={{ backgroundColor: 'var(--color-light-gray)', color: 'var(--color-dark-gray)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            e.currentTarget.style.color = 'var(--color-white)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 202, 74, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-light-gray)'
            e.currentTarget.style.color = 'var(--color-dark-gray)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <FaFacebookF />
        </a>
        <a 
          href="#twitter" 
          aria-label="Twitter"
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl no-underline transition-all duration-300"
          style={{ backgroundColor: 'var(--color-light-gray)', color: 'var(--color-dark-gray)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            e.currentTarget.style.color = 'var(--color-white)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 202, 74, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-light-gray)'
            e.currentTarget.style.color = 'var(--color-dark-gray)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <FaXTwitter />
        </a>
        <a 
          href="#whatsapp" 
          aria-label="WhatsApp"
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl no-underline transition-all duration-300"
          style={{ backgroundColor: 'var(--color-light-gray)', color: 'var(--color-dark-gray)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            e.currentTarget.style.color = 'var(--color-white)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 202, 74, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-light-gray)'
            e.currentTarget.style.color = 'var(--color-dark-gray)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <FaWhatsapp />
        </a>
        <a 
          href="#instagram" 
          aria-label="Instagram"
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl no-underline transition-all duration-300"
          style={{ backgroundColor: 'var(--color-light-gray)', color: 'var(--color-dark-gray)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            e.currentTarget.style.color = 'var(--color-white)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 202, 74, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-light-gray)'
            e.currentTarget.style.color = 'var(--color-dark-gray)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <FaInstagram />
        </a>
        <a 
          href="#linkedin" 
          aria-label="LinkedIn"
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl no-underline transition-all duration-300"
          style={{ backgroundColor: 'var(--color-light-gray)', color: 'var(--color-dark-gray)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            e.currentTarget.style.color = 'var(--color-white)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 202, 74, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-light-gray)'
            e.currentTarget.style.color = 'var(--color-dark-gray)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Separador */}
      <hr className="border-0 border-t border-white/20 my-8 max-w-[1400px] mx-auto" />

      {/* Copyright */}
      <div className="text-center pt-4 max-w-[1400px] mx-auto">
        <p className="m-0 text-sm font-medium" style={{ color: 'var(--color-light-gray)' }}>
          &copy; {new Date().getFullYear()} AGGES. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
