import LoginLayout from '@/layout/LoginLayout'

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LoginLayout>{children}</LoginLayout>
}
