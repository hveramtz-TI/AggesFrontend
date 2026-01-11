'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  // Protección de rutas - verificar autenticación
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-[var(--color-dark-gray)] shadow-[0_2px_4px_rgba(0,0,0,0.2)] h-[70px]">
        {/* Logo */}
        <div className="flex items-center">
          <h2 className="m-0 text-white font-bold text-xl">
            Admin Panel
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex gap-8 max-md:hidden">
          <Link 
            href="/admin/dashboard"
            className={`text-white no-underline font-medium transition-colors duration-300 hover:text-[var(--color-primary)] ${
              isActive('/admin/dashboard') ? 'text-[var(--color-primary)]' : ''
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/clientes"
            className={`text-white no-underline font-medium transition-colors duration-300 hover:text-[var(--color-primary)] ${
              isActive('/admin/clientes') ? 'text-[var(--color-primary)]' : ''
            }`}
          >
            Clientes
          </Link>
          <Link 
            href="/admin/archivos"
            className={`text-white no-underline font-medium transition-colors duration-300 hover:text-[var(--color-primary)] ${
              isActive('/admin/archivos') ? 'text-[var(--color-primary)]' : ''
            }`}
          >
            Archivos
          </Link>
        </nav>

        {/* User actions */}
        <div className="flex items-center gap-4">
          <span className="text-white font-medium max-md:hidden">Administrador</span>
          <button
            onClick={logout}
            className="px-4 py-2 rounded text-white border-none cursor-pointer font-bold transition-all duration-300 hover:bg-[#6fb33d] hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex justify-around py-3 bg-[var(--color-dark-gray)] border-t border-gray-700">
        <Link 
          href="/admin/dashboard"
          className={`text-white no-underline text-sm font-medium ${
            isActive('/admin/dashboard') ? 'text-[var(--color-primary)]' : ''
          }`}
        >
          Dashboard
        </Link>
        <Link 
          href="/admin/clientes"
          className={`text-white no-underline text-sm font-medium ${
            isActive('/admin/clientes') ? 'text-[var(--color-primary)]' : ''
          }`}
        >
          Clientes
        </Link>
        <Link 
          href="/admin/archivos"
          className={`text-white no-underline text-sm font-medium ${
            isActive('/admin/archivos') ? 'text-[var(--color-primary)]' : ''
          }`}
        >
          Archivos
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 max-md:p-4 bg-[var(--color-light-green)] overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
