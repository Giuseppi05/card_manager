'use client';

import React, { useEffect } from 'react';
import { useEditorDataStore } from '@/lib/store/editor-data-store';
import { useGameStore as useCardEditorStore } from '@/lib/store/card-store/card-store';
import { useGameStore } from '@/lib/store/general-config';
import EditorSidebar from './components/EditorSidebar';
import CardPreview from './components/CardPreview';

const CardLabPage = () => {
  
  // Stores
  const { currentGame } = useGameStore();
  const { 
    isLoading, 
    error, 
    loadAllEditorData,
    generations,
    expansions,
    cardTypes,
    moveTypes,
    classes,
    affiliations,
    tags,
    textures,
    logos
  } = useEditorDataStore();
  
  const { 
    currentCard, 
    initializeCardWithEditorData
  } = useCardEditorStore();

  // Cargar datos al montar
  useEffect(() => {
    if (currentGame?.id) {
      loadAllEditorData(currentGame.id);
    }
  }, [currentGame?.id, loadAllEditorData]);

  // Inicializar carta cuando se carguen los datos
  useEffect(() => {
    if (!isLoading && cardTypes.length > 0) {
      initializeCardWithEditorData({
        generations,
        expansions,
        cardTypes,
        moveTypes,
        classes,
        affiliations,
        tags,
        textures,
        logos
      });
    }
  }, [
    isLoading,
    generations,
    expansions,
    cardTypes,
    moveTypes,
    classes,
    affiliations,
    tags,
    textures,
    logos,
    initializeCardWithEditorData
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Cargando datos del editor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!currentGame) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Selecciona un juego primero</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <EditorSidebar
          editorData={{
            generations,
            expansions,
            cardTypes,
            moveTypes,
            classes,
            affiliations,
            tags,
            textures,
            logos
          }}
          currentCard={currentCard}
        />

        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-md mx-auto">
            <CardPreview card={currentCard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLabPage;