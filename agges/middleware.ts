import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware para protección de rutas
 * Se ejecuta antes de cada request
 */
export function middleware(request: NextRequest) {
  // Middleware deshabilitado - usando localStorage para tokens
  // El middleware no puede acceder a localStorage (solo cookies)
  // La protección de rutas se maneja en el cliente
  
  return NextResponse.next()
}

/**
 * Configuración del middleware
 * Especifica en qué rutas debe ejecutarse
 */
export const config = {
  matcher: [
    /*
     * Match todas las rutas excepto:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}
