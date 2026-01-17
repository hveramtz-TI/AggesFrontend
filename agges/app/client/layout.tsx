import MainLayout from '@/layout/MainLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Panel Cliente | AGGES',
};

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
