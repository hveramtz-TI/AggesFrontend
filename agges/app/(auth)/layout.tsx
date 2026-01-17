import LoginLayout from '@/layout/LoginLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | AGGES',
};

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginLayout>{children}</LoginLayout>;
}

