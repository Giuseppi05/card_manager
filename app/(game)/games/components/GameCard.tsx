import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Game } from '@prisma/client';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div
      className={`relative border rounded-xl overflow-hidden shadow-sm transition-all duration-200 ${
        game.isActive
          ? 'hover:shadow-lg cursor-pointer transform hover:-translate-y-1 active:scale-95'
          : 'cursor-default'
      }`}
      onClick={() => game.isActive && onClick(game)}
    >
      {/* Imagen del juego */}
      <div className="relative h-32 sm:h-40 lg:h-48 bg-gray-100">
        {game.image ? (
          <img
            src={game.image}
            alt={game.name}
            className={`w-full h-full object-cover transition-all duration-300 ${
              !game.isActive ? 'grayscale opacity-50' : ''
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FontAwesomeIcon
              icon={faGamepad}
              className={`text-2xl sm:text-3xl lg:text-4xl transition-all duration-300 ${
                game.isActive ? 'text-gray-400' : 'text-gray-300'
              }`}
            />
          </div>
        )}
      </div>
      
      {/* Contenido de la card */}
      <div className="p-3 sm:p-4">
        <h3 className={`font-semibold text-sm sm:text-base lg:text-lg mb-1 transition-colors duration-300 line-clamp-2 ${
          game.isActive ? 'text-gray-900' : 'text-gray-500'
        }`}>
          {game.name}
        </h3>
        
        {/* Indicador de estado */}
        <div className="flex items-center mt-2 sm:mt-3">
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2 ${
            game.isActive ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          <span className={`text-xs font-medium ${
            game.isActive ? 'text-green-700' : 'text-gray-500'
          }`}>
            {game.isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;