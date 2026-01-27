'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import Cookies from 'js-cookie';
import Sidebar from './components/Sidebar/Sidebar';
import SidebarMobile from './components/Sidebar/SidebarMobile';
import { useIsMobile } from '@/hooks/useIsMobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState<number | undefined>(undefined); // 1 = admin, 0 = cliente
  const isMobile = useIsMobile();

  useEffect(() => {
    const userTypeValue = localStorage.getItem('user_type');
    setUserType(userTypeValue === '1' ? 1 : 0);
  }, []);

  useEffect(() => {
    console.log('userType actual:', userType);
  }, [userType]);

  // Escuchar cambios en localStorage (por ejemplo, tras login/logout en otra pestaña)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'user_type') {
        setUserType(e.newValue === '1' ? 1 : 0);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Protección de rutas - verificar autenticación
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const isActive = (path: string) => pathname === path;

  if (userType === undefined) {
    // Mientras no se sabe el tipo de usuario, no renderizar nada (o un loader si prefieres)
    return null;
  }
  return (
    <div className="flex flex-row h-screen w-full overflow-hidden">
      {!isMobile && (
        <Sidebar isActive={isActive} logout={logout} userType={userType} />
      )}
      {isMobile && (
        <SidebarMobile isActive={isActive} logout={logout} open={open} setOpen={setOpen} userType={userType} />
      )}
      <main className="flex-1 max-md:p-4 bg-[var(--background)] overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
