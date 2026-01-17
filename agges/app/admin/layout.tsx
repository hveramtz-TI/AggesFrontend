import MainLayout from '@/layout/MainLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Panel Admin | AGGES',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
