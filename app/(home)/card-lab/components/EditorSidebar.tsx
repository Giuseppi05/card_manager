'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFistRaised, faPalette, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import GeneralsAccordion from './GeneralsAccordion';
import MovementsAccordion from './MovementsAccordion';
import DesignAccordion from './DesignAccordion';

interface EditorSidebarProps {
  editorData: {
    generations: any[];
    expansions: any[];
    cardTypes: any[];
    moveTypes: any[];
    classes: any[];
    affiliations: any[];
    tags: any[];
    textures: any[];
    logos: any[];
  };
  currentCard: any;
}

const sections = [
  { key: 'generals', label: 'Generales', icon: faCog },
  { key: 'movements', label: 'Movimientos', icon: faFistRaised },
  { key: 'design', label: 'Diseño', icon: faPalette }
];

export default function EditorSidebar({ editorData, currentCard }: EditorSidebarProps) {
  const [activeSection, setActiveSection] = useState<'generals' | 'movements' | 'design'>('generals');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const currentSectionData = sections.find(s => s.key === activeSection);

  const handleSectionChange = (sectionKey: 'generals' | 'movements' | 'design') => {
    setActiveSection(sectionKey);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={currentSectionData?.icon!} className="text-gray-600" />
          <div className="relative flex-1">
            <div 
              className="text-lg font-semibold text-gray-900 cursor-pointer flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{currentSectionData?.label}</span>
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className={`text-gray-400 text-sm ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </div>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                {sections.map((section) => (
                  <div
                    key={section.key}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer first:rounded-t-lg last:rounded-b-lg transition-colors"
                    onClick={() => handleSectionChange(section.key as any)}
                  >
                    <FontAwesomeIcon icon={section.icon} className="text-gray-500 text-sm" />
                    <span className="text-gray-900 font-medium">{section.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {activeSection === 'generals' && (
          <GeneralsAccordion 
            editorData={{
              generations: editorData.generations,
              expansions: editorData.expansions,
              cardTypes: editorData.cardTypes,
              classes: editorData.classes,
              affiliations: editorData.affiliations,
              tags: editorData.tags.filter(t => t.category === 'CARD')
            }}
            currentCard={currentCard}
          />
        )}
        
        {activeSection === 'movements' && (
          <MovementsAccordion 
            editorData={{
              moveTypes: editorData.moveTypes,
              tags: editorData.tags.filter(t => t.category === 'MOVE')
            }}
            currentCard={currentCard}
          />
        )}
        
        {activeSection === 'design' && (
          <DesignAccordion 
            editorData={{
              textures: editorData.textures,
              logos: editorData.logos
            }}
            currentCard={currentCard}
          />
        )}
      </div>
    </div>
  );
}