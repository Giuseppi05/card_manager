'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLoader } from '@/context/LoaderContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faCoins } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const { user, userData, logout } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const router = useRouter();

  const getUserInitials = () => {
    if (userData?.name) {
      return userData.name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getUserName = () => {
    return userData?.name || user?.email?.split('@')[0] || 'Usuario';
  };

  const getUserMoney = () => {
    return userData?.coins ? `${userData.coins}` : '0';
  };

  const handleLogout = async () => {
    try {
      showLoader('Cerrando sesión...', true);
      
      // Llamar al endpoint de logout
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      // Ejecutar logout del contexto
      await logout();
      
      // Redirigir a auth
      router.push('/auth');
      
    } catch (error) {
      console.error('Error during logout:', error);
      // Si falla la API, al menos hacer logout local
      await logout();
      router.push('/auth');
    } finally {
      hideLoader();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 relative z-30 h-16">
      <div className="flex items-center justify-end h-16">
        {/* Logo / App Name */}
        {/* <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Card Manager
          </h1>
        </div> */}

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Dinero del usuario - minimalista */}
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full select-none">
            <FontAwesomeIcon 
              icon={faCoins} 
              className="h-3 w-3 text-yellow-600" 
            />
            <span className="text-xs font-medium text-gray-700">
              {getUserMoney()}
            </span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {getUserName()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer">
                  <AvatarImage 
                    src={user?.user_metadata?.avatar_url} 
                    alt={getUserName()} 
                  />
                  <AvatarFallback className="bg-primary-100 text-primary-600 text-xs sm:text-sm font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              align="end" 
              className="w-48 z-60 bg-white border border-gray-200 shadow-lg"
              sideOffset={5}
            >
              {/* Mobile: Mostrar info del usuario */}
              <div className="sm:hidden px-2 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {getUserName()}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>
              
              <DropdownMenuItem className="cursor-pointer hover:bg-primary-50 focus:bg-primary-50">
                <FontAwesomeIcon icon={faUser} className="mr-2 h-4 w-4 text-gray-500" />
                Mi Perfil
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-gray-100" />
              
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;