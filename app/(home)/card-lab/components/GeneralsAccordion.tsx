'use client';

import React, { useState, useMemo } from 'react';
import { useGameStore } from '@/lib/store/card-store/card-store';
import AccordionSection from './AccordionSection';
import GallerySelect from './GallerySelect';

interface GeneralsAccordionProps {
  editorData: {
    generations: any[];
    expansions: any[];
    cardTypes: any[];
    classes: any[];
    affiliations: any[];
    tags: any[];
  };
  currentCard: any;
}

const GeneralsAccordion: React.FC<GeneralsAccordionProps> = ({
  editorData,
  currentCard
}) => {
  const { updateCardField } = useGameStore();
  const [openSections, setOpenSections] = useState({
    basic: true,
    classification: false,
    attributes: false
  });

  const toggleSection = (sectionKey: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const availableExpansions = useMemo(() => {
    if (!currentCard.generationId) return editorData.expansions;
    return editorData.expansions.filter(exp => exp.generationId === currentCard.generationId);
  }, [editorData.expansions, currentCard.generationId]);

  return (
    <div className="p-4 space-y-2">
      <AccordionSection
        title="Información Básica"
        isOpen={openSections.basic}
        onToggle={() => toggleSection('basic')}
        icon="fas fa-info-circle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              value={currentCard.name || ''}
              onChange={(e) => updateCardField('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre de la carta"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HP</label>
            <input
              type="number"
              value={currentCard.hp || ''}
              onChange={(e) => updateCardField('hp', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title="Clasificación"
        isOpen={openSections.classification}
        onToggle={() => toggleSection('classification')}
        icon="fas fa-tags"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expansión</label>
            <select
              value={currentCard.expansionId || ''}
              onChange={(e) => updateCardField('expansionId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar expansión</option>
              {editorData.generations.map((gen: any) => (
                <option key={gen.id} value={gen.id}>{gen.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expansión</label>
            <select
              value={currentCard.expansionId || ''}
              onChange={(e) => updateCardField('expansionId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={!currentCard.generationId}
            >
              <option value="">Seleccionar expansión</option>
              {availableExpansions.map((exp: any) => (
                <option key={exp.id} value={exp.id}>{exp.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              value={currentCard.typeId || ''}
              onChange={(e) => updateCardField('typeId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar tipo</option>
              {editorData.cardTypes.map((type: any) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title="Atributos"
        isOpen={openSections.attributes}
        onToggle={() => toggleSection('attributes')}
        icon="fas fa-chart-bar"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clases ({currentCard.classes?.length || 0})
            </label>
            <GallerySelect
              items={editorData.classes.map((c: any) => ({
                id: c.id,
                name: c.name,
                image: c.logo
              }))}
              selectedItems={currentCard.classes?.map((c: any) => ({
                id: c.id,
                name: c.name,
                image: c.logo
              })) || []}
              onSelectionChange={(classes) => updateCardField('classes', classes)}
              multiple
              placeholder="Buscar clases"
            />
          </div>
        </div>
      </AccordionSection>
    </div>
  );
};

export default GeneralsAccordion;