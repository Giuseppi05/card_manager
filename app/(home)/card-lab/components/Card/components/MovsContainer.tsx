'use client';

import React from 'react';
import { Move, CardVariant, MoveType } from '@prisma/client';
import Movement from './Movement';

interface MovsContainerProps {
  moves: (Move & { moveType?: MoveType })[];
  variant: CardVariant;
}

const MovsContainer: React.FC<MovsContainerProps> = ({ moves, variant }) => {
  // Mostrar máximo 2 movimientos
  const displayMoves = moves.slice(0, 2);

  return (
    <>
      <div className="flex flex-col p-3 pb-0 px-5">
        {displayMoves.map((move, index) => (
          <Movement key={index} move={move} variant={variant} />
        ))}
      </div>
      
      <div className="flex items-center justify-center px-5">
        <div 
          className="w-9/12 h-0.5 rounded-2xl"
          style={{ backgroundColor: variant.textColor || '#000000' }}
        />
      </div>
    </>
  );
};

export default MovsContainer;