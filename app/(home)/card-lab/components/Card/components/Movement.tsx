'use client';

import React from 'react';
import { Move, CardVariant, MoveType } from '@prisma/client';

interface MovementProps {
  move: Move & { moveType?: MoveType };
  variant: CardVariant;
}

const Movement: React.FC<MovementProps> = ({ move, variant }) => {
  // Mapeo de iconos por tipo
  const getTypeIcon = () => {
    if (move.moveType?.name) {
      // Mapear los nombres de tipos a iconos específicos
      switch (move.moveType.name.toLowerCase()) {
        case 'active-attack':
        case 'active-atk':
          return '☆';
        case 'passive-attack':
        case 'pasive-attack':
          return '⊙';
        case 'active-hab':
          return '☆';
        case 'passive-hab':
        case 'pasive-hab':
          return '⊙';
        default:
          return '☆';
      }
    }
    return '☆'; // Icono por defecto
  };

  return (
    <div className="rounded-lg mb-3">
      {/* Cabecera del movimiento */}
      <div className="flex items-center gap-2 mb-1 w-full">
        <span 
          className="text-xl"
          style={{ color: variant.textColor || '#000000' }}
        >
          {getTypeIcon()}
        </span>
        
        <span 
          className="font-bold flex-1"
          style={{ color: variant.textColor || '#000000' }}
        >
          {move.name}
        </span>
        
        {move.damage && (
          <span 
            className="font-bold text-right"
            style={{ color: variant.textColor || '#000000' }}
          >
            {move.damage}
          </span>
        )}
      </div>
      
      {/* Descripción del movimiento */}
      {move.description && (
        <div className="flex justify-between">
          <div className="flex flex-col flex-1 mr-4">
            <p 
              className="text-xs leading-tight ml-2 opacity-80"
              style={{ color: variant.textColor || '#000000' }}
            >
              {move.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movement;