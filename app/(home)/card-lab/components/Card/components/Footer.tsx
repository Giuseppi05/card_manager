'use client';

import React from 'react';
import { Card, CardVariant, Class, Affiliation, Tag } from '@prisma/client';

interface FooterProps {
  card: Card & {
    classes: Class[];
    affiliations: Affiliation[];
    tags?: Tag[];
  };
  variant: CardVariant;
  selectedClasses?: Class[];
  selectedAffiliations?: Affiliation[];
  selectedTags?: Tag[];
}

const Footer: React.FC<FooterProps> = ({ 
  card, 
  variant, 
  selectedClasses = [], 
  selectedAffiliations = [], 
  selectedTags = [] 
}) => {
  // Usar las selecciones del storage en lugar de las relaciones de la carta
  const classesToShow = selectedClasses.length > 0 ? selectedClasses : card.classes;
  const affiliationsToShow = selectedAffiliations.length > 0 ? selectedAffiliations : card.affiliations;
  const tagsToShow = selectedTags.length > 0 ? selectedTags : (card.tags || []);

  const classLogo = classesToShow?.[0]?.logo;
  const affiliationLogo = affiliationsToShow?.[0]?.logo;
  const longLogo = variant.longLogoId;

  return (
    <>
      {/* Tags Section */}
      {tagsToShow && tagsToShow.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {tagsToShow.slice(0, 3).map((tag) => (
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
            {tagsToShow.length > 3 && (
              <span 
                className="text-xs px-1 py-0.5 rounded opacity-60"
                style={{ color: variant.textColor || '#000000' }}
              >
                +{tagsToShow.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Classes and Affiliations */}
      <div className="px-4 mb-3">
        <div className="flex flex-wrap gap-1">
          {/* Classes */}
          {classesToShow?.map((cls) => (
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
          {affiliationsToShow?.map((aff) => (
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

      {/* Logo Footer */}
      <div className="flex items-center justify-center h-20 p-3 gap-2">
        {/* Class Logo */}
        {classLogo && (
          <div className="w-1/5 flex items-center justify-center">
            <img
              src={`/api/logos/${classLogo}`}
              alt="Class logo"
              className="max-h-full max-w-full object-contain drop-shadow-[0_0_2px_black]"
            />
          </div>
        )}
        
        {/* Long Logo */}
        {longLogo && (
          <div className="flex items-center justify-center w-3/5">
            <img
              src={`/api/logos/${longLogo}`}
              alt="Long logo"
              className="max-h-full max-w-full object-contain drop-shadow-[0_0_2px_black]"
            />
          </div>
        )}
        
        {/* Affiliation Logo */}
        {affiliationLogo && (
          <div className="w-1/5 flex items-center justify-center relative">
            <img
              src={`/api/logos/${affiliationLogo}`}
              alt="Affiliation logo"
              className="max-h-full max-w-full object-contain drop-shadow-[0_0_2px_black]"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Footer;