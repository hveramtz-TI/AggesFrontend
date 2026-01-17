'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'client'
}

/**
 * Componente para proteger rutas en el cliente
 * Verifica autenticación y roles de usuario
 * 
 * @example
 * <ProtectedRoute requiredRole="admin">
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({
  children,
  requiredRole
}: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      // Verificar token en cookies
      const token = Cookies.get('access_token')

      if (!token) {
        // No hay token, redirigir a login
        if (pathname?.startsWith('/admin')) {
          router.push('/admin/login')
        } else {
          router.push('/login')
        }
        setIsLoading(false)
        return
      }

      // Verificar rol si es requerido
      if (requiredRole) {
        const userStr = localStorage.getItem('user')

        if (!userStr) {
          // No hay información de usuario
          router.push('/login')
          setIsLoading(false)
          return
        }

        try {
          const user = JSON.parse(userStr)

          // Verificar que el usuario tenga el rol requerido
          if (user.role !== requiredRole && user.is_staff !== (requiredRole === 'admin')) {
            // No tiene el rol correcto, redirigir a home
            router.push('/')
            setIsLoading(false)
            return
          }
        } catch (error) {
          console.error('Error parsing user data:', error)
          router.push('/login')
          setIsLoading(false)
          return
        }
      }

      // Todo ok, autorizar
      setIsAuthorized(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router, pathname, requiredRole])

  // Mostrar loader mientras verifica
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-gray)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mb-4"
            style={{ borderColor: 'var(--color-primary)' }}
          />
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  // Si no está autorizado, no renderizar nada (ya redirigió)
  if (!isAuthorized) {
    return null
  }

  // Autorizado, mostrar contenido
  return <>{children}</>
}
