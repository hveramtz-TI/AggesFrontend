import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Proxy para protección de rutas (Anteriormente Middleware)
 * Se ejecuta antes de cada request en el servidor
 */
export function proxy(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value
    const { pathname } = request.nextUrl

    // Rutas públicas que no requieren autenticación
    const isPublicRoute =
        pathname === '/' ||
        pathname === '/login' ||
        pathname.startsWith('/admin/login') ||
        pathname.includes('/public/')

    // Si no hay token y no es ruta pública, redirigir a login
    if (!token && !isPublicRoute) {
        const loginUrl = pathname.startsWith('/admin')
            ? new URL('/admin/login', request.url)
            : new URL('/login', request.url)

        return NextResponse.redirect(loginUrl)
    }

    // Si hay token y trata de ir al login, redirigir al dashboard (evitar login innecesario)
    if (token && (pathname === '/login' || pathname === '/admin/login')) {
        const dashboardUrl = pathname.startsWith('/admin')
            ? new URL('/admin/dashboard', request.url)
            : new URL('/client/dashboard', request.url)

        return NextResponse.redirect(dashboardUrl)
    }

    return NextResponse.next()
}

/**
 * Configuración del proxy
 * Especifica en qué rutas debe ejecutarse
 */
export const config = {
    matcher: [
        /*
         * Match todas las rutas excepto:
         * - api (API routes internos de Next.js si los hubiera)
         * - _next/static (archivos estáticos)
         * - _next/image (optimización de imágenes)
         * - favicon.ico, .svg, .png, .mp4 (archivos de assets)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',

    ],
}
