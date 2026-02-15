'use client';

import React from 'react';
import { ImageContainerProps } from '../../../typings';

const ImageContainer: React.FC<ImageContainerProps> = ({ cardName, variant }) => {
  const imageStyles = {
    boxShadow: "0 4px 8px 1px rgba(0,0,0,0.3), inset 0 0 10px rgba(0,0,0,0.5)",
    borderColor: variant.borderInternalColor || variant.borderColor || '#f59e0b',
    overflow: "hidden" as const,
  };

  return (
    <div className="w-full h-2/5 flex justify-center items-center px-4">
      <div
        className="border-4 w-5/6 h-full bg-white overflow-hidden flex items-center justify-center relative rounded-lg"
        style={imageStyles}
      >
        {variant.imageUrl ? (
          <img 
            src={variant.imageUrl} 
            alt={cardName}
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${variant.zoom || 1}) translate(${variant.posX || 0}px, ${variant.posY || 0}px)`
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span className="text-sm">Imagen del personaje</span>
          </div>
        )}
        
        {/* Logo Overlay */}
        {variant.longLogoId && (
          <div className="absolute bottom-2 right-2 w-8 h-8">
            <img 
              src={`/api/logos/${variant.longLogoId}`}
              alt="Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_2px_black]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageContainer;