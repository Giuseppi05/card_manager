"use client"
import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useActiveGamesByUser } from './hooks/useGames'
import { useGameStore } from '@/lib/store/general-config'
import { useModal } from '@/context/ModalContext'
import Loader from '@/components/ui/Loader'
import IconButton from '@/components/forms/IconButton'
import AddGameModal from './components/AddGameModal'
import GameCard from './components/GameCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { Game } from '@prisma/client'

const Page = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const {setCurrentGame} = useGameStore();
  const { games, loading: gamesLoading, error, refetch } = useActiveGamesByUser();
  const { showModal, hideModal } = useModal();

  useEffect(() => {
    if (!loading && (!user || !isAuthenticated)) {
      router.push('/auth');
    }
  }, [isAuthenticated, user, loading, router]);

  const openAddGameModal = () => {
    showModal(
      'Agregar Juego',
      <AddGameModal
        onCancel={hideModal}
        onSuccess={() => {
          refetch();
        }}
      />
    );
  };

  const handleGameClick = (game: Game) => {
    setCurrentGame(game);
    router.push('/dashboard');
  };

  if (loading || !user) return null;

  return (
    <div className='min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8'>
      {/* Header con título y botón agregar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className='text-xl sm:text-2xl font-bold'>Mis juegos</h1>
        <IconButton 
          icon={faPlus} 
          variant="primary" 
          onClick={openAddGameModal}
          className="w-full sm:w-auto"
        >
          Agregar Juego
        </IconButton>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {/* Sección de juegos con loader inline */}
      <div className="min-h-100 relative">
        {gamesLoading && (
          <div className="flex items-center justify-center h-48">
            <Loader text="Cargando juegos..." overlay={false} size="md" />
          </div>
        )}
        
        {!gamesLoading && !error && games.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faGamepad} className="text-gray-400 text-xl sm:text-2xl" />
            </div>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">No tienes juegos disponibles.</p>
            <IconButton 
              icon={faPlus} 
              variant="primary" 
              onClick={openAddGameModal}
              className="w-full sm:w-auto"
            >
              Agregar tu primer juego
            </IconButton>
          </div>
        )}
        
        {!gamesLoading && games.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={handleGameClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page