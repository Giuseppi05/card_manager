'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faStore,
  faBook,
  faLayerGroup,
  faGamepad,
  faFlask,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { useSidebar } from '../SidebarContext';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: faTachometerAlt,
    },
    // {
    //   name: 'Tienda',
    //   href: '/tienda',
    //   icon: faStore,
    // },
    {
      name: 'Mis Cartas',
      href: '/my-cards',
      icon: faLayerGroup,
    },
    {
      name: 'Enciclopedia',
      href: '/encyclopedia',
      icon: faBook,
    },
    {
      name: 'Card Lab',
      href: '/card-lab',
      icon: faFlask,
    },
    // {
    //   name: 'Duelos',
    //   href: '/games',
    //   icon: faGamepad,
    // },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white border border-gray-200 shadow-sm lg:hidden hover:bg-gray-50"
      >
        <FontAwesomeIcon icon={faBars} className="h-4 w-4 text-gray-600" />
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300',
          // Desktop behavior
          'hidden lg:block',
          isCollapsed ? 'w-16' : 'w-64',
          // Mobile behavior
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0 w-64 block lg:hidden' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header - alineado exactamente con el header principal */}
          <div className="flex items-center justify-between px-3 h-16 border-b border-gray-200 bg-white">
            {!isCollapsed && (
              <h2 className="text-sm font-semibold text-primary-600 truncate">
                Card Manager
              </h2>
            )}
            <div className="flex items-center space-x-2">
              {/* Mobile close button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-md hover:bg-gray-100 lg:hidden"
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4 text-gray-600" />
              </button>
              
              {/* Desktop collapse button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-md hover:bg-gray-100 hidden lg:block cursor-pointer"
              >
                <FontAwesomeIcon 
                  icon={faBars} 
                  className={cn(
                    "h-4 w-4 text-gray-600 transition-transform duration-200",
                    isCollapsed && "rotate-90"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md',
                    'hover:text-primary-600 hover:bg-primary-50',
                    active
                      ? 'text-primary-600 bg-primary-50 font-semibold'
                      : 'text-gray-600',
                    isCollapsed && 'justify-center'
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={cn(
                      'h-4 w-4',
                      active ? 'text-primary-600' : 'text-gray-500',
                      !isCollapsed && 'mr-3'
                    )}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;