'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/lib/store/card-store/card-store';
import AccordionSection from './AccordionSection';

interface MovementsAccordionProps {
  editorData: {
    moveTypes: any[];
    tags: any[];
  };
  currentCard: any;
}

const MovementsAccordion: React.FC<MovementsAccordionProps> = ({
  editorData,
  currentCard
}) => {
  const { updateCardField } = useGameStore();
  const [expandedMoves, setExpandedMoves] = useState<{[key: number]: boolean}>({ 0: true, 1: false });

  // Asegurar exactamente 2 movimientos
  useEffect(() => {
    if (!currentCard.moves || currentCard.moves.length !== 2) {
      const moves = [
        {
          id: '',
          name: 'Movimiento 1',
          damage: 50,
          description: '',
          typeId: editorData.moveTypes[0]?.id || '',
          level: 'none',
          tags: []
        },
        {
          id: '',
          name: 'Movimiento 2', 
          damage: 80,
          description: '',
          typeId: editorData.moveTypes[0]?.id || '',
          level: 'none',
          tags: []
        }
      ];
      updateCardField('moves', moves);
    }
  }, [currentCard.moves, editorData.moveTypes, updateCardField]);

  const toggleMove = (index: number) => {
    setExpandedMoves(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const updateMove = (index: number, field: string, value: any) => {
    if (!currentCard.moves?.[index]) return;
    
    const updatedMoves = [...currentCard.moves];
    updatedMoves[index] = { ...updatedMoves[index], [field]: value };
    updateCardField('moves', updatedMoves);
  };

  if (!currentCard.moves || currentCard.moves.length < 2) {
    return <div className="p-4 text-center text-gray-500">Cargando movimientos...</div>;
  }

  return (
    <div className="p-4 space-y-3">
      {currentCard.moves.slice(0, 2).map((move: any, index: number) => (
        <AccordionSection
          key={index}
          title={`${move.name || `Movimiento ${index + 1}`} (${move.damage || 0} daño)`}
          isOpen={expandedMoves[index] || false}
          onToggle={() => toggleMove(index)}
          icon="fas fa-fist-raised"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={move.name || ''}
                onChange={(e) => updateMove(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={`Movimiento ${index + 1}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daño</label>
                <input
                  type="number"
                  value={move.damage || ''}
                  onChange={(e) => updateMove(index, 'damage', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select
                  value={move.typeId || ''}
                  onChange={(e) => updateMove(index, 'typeId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar tipo</option>
                  {editorData.moveTypes.map((type: any) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                value={move.description || ''}
                onChange={(e) => updateMove(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Descripción del movimiento"
              />
            </div>
          </div>
        </AccordionSection>
      ))}
    </div>
  );
};

export default MovementsAccordion;