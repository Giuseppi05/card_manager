'use client';

import React from 'react';
import { Heart, Zap } from 'lucide-react';

interface CardPreviewProps {
  card: any;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card }) => {
  const variant = card.variants?.[0] || {};
  
  return (
    <div className="flex justify-center">
      <div className="w-80 h-112 relative">
        {/* Card Container */}
        <div 
          className="w-full h-full rounded-2xl border-4 shadow-2xl relative overflow-hidden"
          style={{ 
            backgroundColor: variant.bgColor || '#fbbf24',
            borderColor: variant.borderColor || '#f59e0b'
          }}
        >
          {/* Background Texture */}
          {variant.textureId && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{ 
                backgroundImage: `url('/api/textures/${variant.textureId}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}

          {/* Inner Border */}
          <div 
            className="absolute inset-2 rounded-xl border-2"
            style={{ borderColor: variant.borderInternalColor || variant.borderColor || '#f59e0b' }}
          >
            {/* Header Section */}
            <div className="p-4">
              {/* Card Name */}
              <h2 
                className="text-xl font-bold text-center mb-2"
                style={{ color: variant.textColor || '#000000' }}
              >
                {card.name}
              </h2>

              {/* HP and Power */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" style={{ color: variant.textColor || '#000000' }} />
                  <span className="font-semibold" style={{ color: variant.textColor || '#000000' }}>
                    {card.hp || 0}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" style={{ color: variant.textColor || '#000000' }} />
                  <span className="font-semibold" style={{ color: variant.textColor || '#000000' }}>
                    {card.power || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Character Image Area */}
            <div className="px-4 mb-4">
              <div className="aspect-square bg-gray-200 rounded-lg border-2 border-gray-300 bg-cover bg-center relative overflow-hidden">
                {variant.imageUrl ? (
                  <img 
                    src={variant.imageUrl} 
                    alt={card.name}
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
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Classes and Affiliations */}
            <div className="px-4 mb-3">
              <div className="flex flex-wrap gap-1">
                {/* Classes */}
                {card.classes?.map((cls: any) => (
                  <span 
                    key={cls.id}
                    className="inline-block px-2 py-1 text-xs rounded-full border"
                    style={{ 
                      color: variant.textColor || '#000000',
                      borderColor: variant.textColor || '#000000',
                      backgroundColor: 'rgba(255,255,255,0.2)'
                    }}
                  >
                    {cls.name}
                  </span>
                ))}
                
                {/* Affiliations */}
                {card.affiliations?.map((aff: any) => (
                  <span 
                    key={aff.id}
                    className="inline-block px-2 py-1 text-xs rounded-full border border-dashed"
                    style={{ 
                      color: variant.textColor || '#000000',
                      borderColor: variant.textColor || '#000000',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                  >
                    {aff.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Moves Section */}
            <div className="px-4 pb-4 flex-1">
              <h3 
                className="text-sm font-semibold mb-2"
                style={{ color: variant.textColor || '#000000' }}
              >
                Movimientos
              </h3>
              <div className="space-y-2">
                {card.moves?.slice(0, 2).map((move: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-white bg-opacity-20 rounded-lg p-2 border"
                    style={{ borderColor: variant.textColor ? `${variant.textColor}40` : '#00000040' }}
                  >
                    <div className="flex justify-between items-start">
                      <span 
                        className="font-medium text-sm"
                        style={{ color: variant.textColor || '#000000' }}
                      >
                        {move.name}
                      </span>
                      {move.damage && (
                        <span 
                          className="text-sm font-bold"
                          style={{ color: variant.textColor || '#000000' }}
                        >
                          {move.damage}
                        </span>
                      )}
                    </div>
                    {move.description && (
                      <p 
                        className="text-xs mt-1 opacity-80"
                        style={{ color: variant.textColor || '#000000' }}
                      >
                        {move.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {card.tags?.length > 0 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-1">
                  {card.tags.slice(0, 3).map((tag: any) => (
                    <span 
                      key={tag.id}
                      className="text-xs px-1 py-0.5 rounded"
                      style={{ 
                        color: variant.textColor || '#000000',
                        backgroundColor: 'rgba(255,255,255,0.3)'
                      }}
                    >
                      #{tag.name}
                    </span>
                  ))}
                  {card.tags.length > 3 && (
                    <span 
                      className="text-xs px-1 py-0.5 rounded opacity-60"
                      style={{ color: variant.textColor || '#000000' }}
                    >
                      +{card.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;