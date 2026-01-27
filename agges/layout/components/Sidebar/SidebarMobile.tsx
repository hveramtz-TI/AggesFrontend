'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {
    FaHome,
    FaFileAlt,
    FaFileInvoice,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaUsers,
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
import React from 'react'
import { menu } from '@/data/menu'

interface SidebarMobileProps {
    isActive: (path: string) => boolean;
    logout?: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
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

const SidebarMobile = ({ isActive, logout, open, setOpen, userType }: SidebarMobileProps) => {
    const role = userType === 1 ? 'admin' : 'client';
    const filteredMenu = (menu as MenuSection[]).filter((section) => section.roles.includes(role));

    // Debug logging
    React.useEffect(() => {
        console.log('SidebarMobile state changed - Open:', open);
    }, [open]);

    const pathname = usePathname();

    // Estado para secciones expandidas
    const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>(() => {
        return filteredMenu.reduce((acc, section) => {
            const hasActiveItem = section.items.some((item) => isActive(item.path));
            return { ...acc, [section.section]: hasActiveItem };
        }, {} as Record<string, boolean>);
    });

    // Actualizar cuando cambia la ruta, el tipo de usuario o si se abre el menú
    React.useEffect(() => {
        const newExpandedState = filteredMenu.reduce((acc, section) => {
            const hasActiveItem = section.items.some((item) => isActive(item.path));
            return { ...acc, [section.section]: hasActiveItem };
        }, {} as Record<string, boolean>);
        setExpandedSections(newExpandedState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, userType, open]);

    const toggleSection = (sectionName: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionName]: !prev[sectionName]
        }));
    };

    // Forzar que el sidebar móvil nunca use modo dark
    React.useEffect(() => {
        const sidebarMobile = document.getElementById('sidebar-mobile-fixed');
        if (sidebarMobile) {
            sidebarMobile.classList.remove('dark');
        }
    }, [open]);

    return (
        <>
            {/* Botón hamburguesa - Solo visible cuando está cerrado */}
            {!open && (
                <button
                    className={"md:hidden fixed top-4 left-4 z-50 items-center justify-center p-3 rounded-lg bg-[var(--color-dark-gray)] text-white shadow-lg border-none cursor-pointer hover:bg-gray-800 transition-colors flex"}
                    onClick={() => {
                        console.log('Clicked Open Button');
                        setOpen(true);
                    }}
                    aria-label="Abrir menú"
                    type="button"
                >
                    <FaBars size={20} />
                </button>
            )}

            {/* Overlay y menú lateral */}
            {open && (
                <>
                    {/* Overlay background */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        onClick={() => {
                            console.log('Clicked Overlay to Close');
                            setOpen(false);
                        }}
                    />

                    {/* Menú lateral móvil */}
                    <aside
                        id="sidebar-mobile-fixed"
                        className="sidebar-fixed md:hidden fixed top-0 left-0 h-full w-[280px] bg-[var(--color-dark-gray)] z-50 shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <h2 className="text-xl font-bold text-[#83CA4A] m-0">AGGES</h2>
                            <button
                                onClick={() => {
                                    console.log('Clicked Close X Button');
                                    setOpen(false);
                                }}
                                className="p-2 rounded-full hover:bg-white/10 text-white border-none cursor-pointer transition-colors relative z-50"
                                aria-label="Cerrar menú"
                                type="button"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                            {filteredMenu.map((section) => {
                                const isExpanded = expandedSections[section.section];
                                return (
                                    <div key={section.section} className="flex flex-col gap-1">
                                        <button
                                            onClick={() => toggleSection(section.section)}
                                            className="flex items-center justify-between p-3 text-[#83CA4A] font-bold text-xs uppercase tracking-wider bg-transparent border-none cursor-pointer transition-colors"
                                        >
                                            {section.section}
                                            {isExpanded ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                                        </button>

                                        <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    href={item.path}
                                                    className={`flex items-center gap-4 py-3 px-4 rounded-lg text-white no-underline text-sm font-medium transition-all duration-200 hover:bg-white/10 ${isActive(item.path)
                                                        ? 'bg-[#83CA4A] text-white shadow-md'
                                                        : 'text-white'
                                                        }`}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="text-white">
                                                        {iconMap[item.icon]}
                                                    </span>
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="h-px bg-gray-700 w-full my-2 opacity-50"></div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 border-t border-gray-700">
                            <button
                                onClick={() => { if (logout) logout(); setOpen(false); }}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white hover:bg-red-600 border-none cursor-pointer transition-all duration-300 font-medium"
                            >
                                <FaSignOutAlt size={18} />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}

export default SidebarMobile
