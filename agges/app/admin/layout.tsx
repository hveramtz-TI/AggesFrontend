'use client'

import { usePathname } from 'next/navigation'
import AdminLayout from '@/layout/AdminLayout'

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Si estamos en login, no aplicar el layout del panel
  if (pathname === '/admin/login') {
    return <>{children}</>
  }
  
  return <AdminLayout>{children}</AdminLayout>
}
