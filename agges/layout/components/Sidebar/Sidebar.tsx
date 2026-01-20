'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { menu } from '@/data/menu'
import {
    FaHome,
    FaUsers,
    FaFileAlt,
    FaFileInvoice,
    FaRecycle,
    FaCalendarAlt,
    FaFileContract,
    FaBoxes,
    FaBriefcase,
    FaMapMarkedAlt,
    FaMapPin,
    FaChevronDown,
    FaChevronRight
} from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa6';

interface SidebarProps {
    isActive: (path: string) => boolean;
    logout: () => void;
    userType: number; // 1 = admin, 0 = cliente
}

// Mapeo de iconos string a componentes
const iconMap: Record<string, React.ReactNode> = {
    FaHome: <FaHome size={20} />,
    FaUsers: <FaUsers size={20} />,
    FaFileAlt: <FaFileAlt size={20} />,
    FaFileInvoice: <FaFileInvoice size={20} />,
    FaRecycle: <FaRecycle size={20} />,
    FaCalendarAlt: <FaCalendarAlt size={20} />,
    FaFileContract: <FaFileContract size={20} />,
    FaBoxes: <FaBoxes size={20} />,
    FaBriefcase: <FaBriefcase size={20} />,
    FaMapMarkedAlt: <FaMapMarkedAlt size={20} />,
    FaMapPin: <FaMapPin size={20} />,
    FaCalendar: <FaCalendar size={20} />,
};

// Define the type for menu items
interface MenuItem {
    name: string;
    icon: string;
    path: string;
}

interface MenuSection {
    section: string;
    roles: string[];
    items: MenuItem[];
}

const Sidebar = ({ isActive, logout, userType }: SidebarProps) => {
    const role = userType === 1 ? 'admin' : 'client';
    const filteredMenu = (menu as MenuSection[]).filter((section) => section.roles.includes(role));

    const pathname = usePathname();

    // Estado para secciones expandidas
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
        return filteredMenu.reduce((acc, section) => {
            const hasActiveItem = section.items.some((item) => isActive(item.path));
            return { ...acc, [section.section]: hasActiveItem };
        }, {} as Record<string, boolean>);
    });

    // Actualizar secciones expandidas cuando cambia la ruta o el tipo de usuario
    React.useEffect(() => {
        const newExpandedState = filteredMenu.reduce((acc, section) => {
            const hasActiveItem = section.items.some((item) => isActive(item.path));
            return { ...acc, [section.section]: hasActiveItem };
        }, {} as Record<string, boolean>);
        setExpandedSections(newExpandedState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, userType]);

    const toggleSection = (sectionName: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionName]: !prev[sectionName]
        }));
    };

    const [loggingOut, setLoggingOut] = React.useState(false);

    const handleLogout = async () => {
        if (loggingOut) return;
        setLoggingOut(true);
        try {
            await logout();
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <aside className="shrink-0 w-[250px] bg-[var(--color-dark-gray)] text-white shadow-xl transition-transform duration-300 overflow-y-auto max-md:hidden flex flex-col">
            <div className='flex items-center justify-center py-8'>
                {/* Aquí podrías poner el Logo si lo tienes */}
                <h2 className="text-2xl font-bold text-[var(--color-primary)] m-0">AGGES</h2>
            </div>

            <div className='flex flex-col flex-1 px-4 gap-6'>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wider text-[10px]">Rol actual</span>
                    <span className="text-white font-medium text-lg border-b border-gray-700 pb-2 mb-2 w-full text-center">
                        {userType === 1 ? 'Administrador' : 'Cliente'}
                    </span>
                </div>

                <nav className="flex flex-col gap-4 w-full">
                    {filteredMenu.map((section) => {
                        const isExpanded = expandedSections[section.section];
                        return (
                            <div key={section.section} className="flex flex-col gap-2">
                                <button
                                    onClick={() => toggleSection(section.section)}
                                    className="flex items-center justify-between w-full text-gray-400 hover:text-white transition-colors py-2 px-2 focus:outline-none bg-transparent border-none cursor-pointer group"
                                >
                                    <span className="text-xs uppercase tracking-widest font-bold group-hover:text-[var(--color-primary)] transition-colors">
                                        {section.section}
                                    </span>
                                    {isExpanded ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                                </button>

                                <div className={`flex flex-col gap-1 transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            className={`flex items-center gap-3 text-white no-underline font-medium transition-all duration-200 hover:bg-white/10 py-2.5 px-4 rounded-lg group ${isActive(item.path)
                                                ? 'bg-[var(--color-primary)] text-white shadow-md'
                                                : 'text-gray-300'
                                                }`}
                                        >
                                            <span className={`shrink-0 ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{iconMap[item.icon]}</span>
                                            <span className="text-sm whitespace-nowrap">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </nav>

                <div className="mt-auto w-full py-6">
                    <button
                        onClick={handleLogout}
                        className={`w-full px-4 py-3 rounded-lg text-white border-none cursor-pointer font-bold transition-all duration-300 bg-red-600/80 hover:bg-red-600 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 ${loggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loggingOut}
                    >
                        {loggingOut ? 'Saliendo...' : (
                            <>
                                <span>Cerrar Sesión</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar
