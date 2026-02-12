'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/lib/store/card-store/card-store';
import AccordionSection from './AccordionSection';
import ColorSelect from './ColorSelect';
import GallerySelect from './GallerySelect';

interface DesignAccordionProps {
  editorData: {
    textures: any[];
    logos: any[];
  };
  currentCard: any;
}

const DesignAccordion: React.FC<DesignAccordionProps> = ({
  editorData,
  currentCard
}) => {
  const { updateCardField } = useGameStore();
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    colors: true,
    assets: false
  });

  const [recentColors, setRecentColors] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('card-editor-recent-colors');
    if (saved) {
      try {
        setRecentColors(JSON.parse(saved));
      } catch (e) {
        console.warn('Error loading recent colors');
      }
    }
  }, []);

  useEffect(() => {
    if (recentColors.length > 0) {
      localStorage.setItem('card-editor-recent-colors', JSON.stringify(recentColors));
    }
  }, [recentColors]);

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const updateVariant = (field: string, value: any) => {
    const variant = currentCard.variants?.[0] || {};
    const updatedVariant = { ...variant, [field]: value };
    updateCardField('variants', [updatedVariant]);
  };

  const getCurrentVariant = () => {
    return currentCard.variants?.[0] || {};
  };

  const currentVariant = getCurrentVariant();

  return (
    <div className="p-4 space-y-2">
      <AccordionSection
        title="Colores"
        isOpen={openSections['colors']}
        onToggle={() => toggleSection('colors')}
        icon="fas fa-palette"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color Primario</label>
            <input
              type="color"
              value={currentVariant.primaryColor || '#3B82F6'}
              onChange={(e) => updateVariant('primaryColor', e.target.value)}
              className="w-full h-10 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color Secundario</label>
            <input
              type="color"
              value={currentVariant.secondaryColor || '#8B5CF6'}
              onChange={(e) => updateVariant('secondaryColor', e.target.value)}
              className="w-full h-10 border border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title="Assets"
        isOpen={openSections['assets']}
        onToggle={() => toggleSection('assets')}
        icon="fas fa-images"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texturas ({editorData.textures.length})
            </label>
            <GallerySelect
              items={editorData.textures.map((t: any) => ({
                id: t.id,
                name: t.name,
                image: t.url
              }))}
              selectedItems={currentVariant.textureId ? [
                editorData.textures
                  .filter((t: any) => t.id === currentVariant.textureId)
                  .map((t: any) => ({ id: t.id, name: t.name, image: t.url }))[0]
              ].filter(Boolean) : []}
              onSelectionChange={(textures) => updateVariant('textureId', textures[0]?.id || null)}
              multiple={false}
              placeholder="Buscar texturas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logos ({editorData.logos.length})
            </label>
            <GallerySelect
              items={editorData.logos.map((l: any) => ({
                id: l.id,
                name: l.name,
                image: l.url
              }))}
              selectedItems={currentVariant.logoId ? [
                editorData.logos
                  .filter((l: any) => l.id === currentVariant.logoId)
                  .map((l: any) => ({ id: l.id, name: l.name, image: l.url }))[0]
              ].filter(Boolean) : []}
              onSelectionChange={(logos) => updateVariant('logoId', logos[0]?.id || null)}
              multiple={false}
              placeholder="Buscar logos"
            />
          </div>
        </div>
      </AccordionSection>
    </div>
  );
};

export default DesignAccordion;