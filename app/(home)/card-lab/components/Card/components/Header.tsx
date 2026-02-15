'use client';

import React from 'react';
import { CardVariant, Logo } from '@prisma/client';

interface HeaderProps {
  cardName: string;
  hp: number;
  generationLogo?: Logo | null;
  variant: CardVariant;
}

const Header: React.FC<HeaderProps> = ({ cardName, hp, generationLogo, variant }) => {
  return (
    <div className="flex justify-between items-center p-3 pb-1">
      <div className="flex-1 mr-2">
        <h2 
          className="text-xl font-bold"
          style={{ color: variant.textColor || '#000000' }}
        >
          {cardName}
        </h2>
      </div>
      <div className="flex items-center text-xl">
        <span 
          className="w-16 text-right font-semibold mr-1"
          style={{ color: variant.textColor || '#000000' }}
        >
          {hp || 0}
        </span>
        <span 
          className="font-bold"
          style={{ color: variant.textColor || '#000000' }}
        >
          HP
        </span>
        {generationLogo && (
          <div className="w-15 h-15 ml-1 flex items-center justify-center">
            <img 
              src={`/api/logos/${generationLogo.id}`} 
              alt={`Generation logo: ${generationLogo.name}`}
              className="max-h-full max-w-full object-contain drop-shadow-[0_0_2px_black]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;