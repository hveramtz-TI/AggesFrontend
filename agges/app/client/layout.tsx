'use client'
import MainLayout from '@/layout/MainLayout'

export default function ClientGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
