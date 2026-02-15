'use client';
import React, { useEffect } from 'react';
import { useEditorDataStore, useCardEditorStore } from '@/lib/store';
import { useGameStore } from '@/lib/store/general-config';
import Loader from '@/components/ui/Loader';

const CardLabPage = () => {
  const { currentGame } = useGameStore();
  const {
    // Estados
    isLoading,
    error,
    currentGameId,
    // Datos
    generations,
    expansions,
    cardTypes,
    moveTypes,
    classes,
    affiliations,
    tags,
    textures,
    logos,
    // Acciones
    loadAllEditorData,
    reset
  } = useEditorDataStore();

  // Card Editor Store
  const {
    currentCard,
    currentVariant,
    isDirty,
    mode,
    error: cardEditorError,
    createNewCard,
    updateCard,
    updateVariant,
    updateGeneration,
    reset: resetCardEditor
  } = useCardEditorStore();

  // Obtener expansiones disponibles para la generación actual
  const availableExpansions = currentCard && currentCard.generationId ? 
    expansions.filter(exp => exp.generationId === currentCard.generationId) : 
    [];

  useEffect(() => {
    if (!currentGame?.id) {
      reset();
      resetCardEditor();
      return;
    }
    
    loadAllEditorData(currentGame.id);
  }, [currentGame?.id, loadAllEditorData, reset, resetCardEditor]);

  // Crear carta por defecto cuando los datos estén listos
  useEffect(() => {
    if (!isLoading && !error && generations.length > 0 && expansions.length > 0 && !currentCard) {
      const editorData = {
        generations,
        expansions,
        cardTypes,
        moveTypes,
        classes,
        affiliations,
        tags,
        textures,
        logos
      };
      createNewCard(editorData);
    }
  }, [isLoading, error, generations, expansions, cardTypes, moveTypes, classes, currentCard, createNewCard]);

  if (!currentGame) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-yellow-800 font-semibold">⚠️ No hay juego seleccionado</h3>
          <p className="text-yellow-700 mt-1">
            Selecciona un juego para cargar los datos del editor.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">❌ Error cargando datos</h3>
          <p className="text-red-700 mt-1">{error}</p>
          <button 
            onClick={() => loadAllEditorData(currentGame.id)}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {isLoading && (
        <div className="flex items-center justify-center h-48">
          <Loader text="Cargando datos del editor..." overlay={false} size="md" />
        </div>
      )}
      
      {!isLoading && currentCard && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              🧪 Card Lab - {mode === 'create' ? 'Nueva Carta' : 'Editando Carta'}
              {isDirty && <span className="text-orange-500 ml-2">●</span>}
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={() => resetCardEditor()}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Reset
              </button>
              <button 
                onClick={() => {
                  const editorData = { generations, expansions, cardTypes, moveTypes, classes, affiliations, tags, textures, logos };
                  createNewCard(editorData);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Nueva Carta
              </button>
            </div>
          </div>

          {cardEditorError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-red-800 font-semibold">❌ Error en Card Editor</h3>
              <p className="text-red-700 mt-1">{cardEditorError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Datos de la Carta */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">📋 Datos de la Carta</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={currentCard.name}
                  onChange={(e) => updateCard({ name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HP</label>
                  <input
                    type="number"
                    value={currentCard.hp || ''}
                    onChange={(e) => updateCard({ hp: e.target.value ? parseInt(e.target.value) : null })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Power</label>
                  <input
                    type="number"
                    value={currentCard.power}
                    onChange={(e) => updateCard({ power: parseInt(e.target.value) || 1 })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Generación</label>
                <select
                  value={currentCard.generationId}
                  onChange={(e) => {
                    updateGeneration(e.target.value, { generations, expansions });
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {generations.map((generation) => (
                    <option key={generation.id} value={generation.id}>
                      {generation.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expansión</label>
                <select
                  value={currentCard.expansionId}
                  onChange={(e) => {
                    const expansion = availableExpansions.find(exp => exp.id === e.target.value);
                    updateCard({ expansionId: e.target.value, expansion });
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  disabled={availableExpansions.length === 0}
                >
                  {availableExpansions.length === 0 ? (
                    <option value="">No hay expansiones disponibles</option>
                  ) : (
                    availableExpansions.map((expansion) => (
                      <option key={expansion.id} value={expansion.id}>
                        {expansion.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Carta</label>
                <select
                  value={currentCard.typeId}
                  onChange={(e) => {
                    const cardType = cardTypes.find(ct => ct.id === e.target.value);
                    updateCard({ typeId: e.target.value, cardType });
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {cardTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clases</label>
                <div className="space-y-2">
                  {classes.map((cls) => (
                    <label key={cls.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={currentCard.classes.some(c => c.id === cls.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateCard({ classes: [...currentCard.classes, cls] });
                          } else {
                            updateCard({ classes: currentCard.classes.filter(c => c.id !== cls.id) });
                          }
                        }}
                        className="mr-2"
                      />
                      <img 
                        src={cls.logo} 
                        alt={cls.name}
                        className="w-6 h-6 mr-2 rounded border"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholders/no-image.png';
                        }}
                      />
                      {cls.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Afiliaciones</label>
                <div className="space-y-2">
                  {affiliations.map((aff) => (
                    <label key={aff.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={currentCard.affiliations.some(a => a.id === aff.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateCard({ affiliations: [...currentCard.affiliations, aff] });
                          } else {
                            updateCard({ affiliations: currentCard.affiliations.filter(a => a.id !== aff.id) });
                          }
                        }}
                        className="mr-2"
                      />
                      <img 
                        src={aff.logo} 
                        alt={aff.name}
                        className="w-6 h-6 mr-2 rounded border"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholders/no-image.png';
                        }}
                      />
                      {aff.name}
                    </label>
                  ))}
                </div>
                
                <div className="mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={currentCard.isAffiliationMarked}
                      onChange={(e) => updateCard({ isAffiliationMarked: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">Marcar afiliaciones en la carta</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Datos de la Variante */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">🎨 Variante Actual</h2>
              
              {currentVariant && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Variante</label>
                    <input
                      type="text"
                      value={currentVariant.variantName}
                      onChange={(e) => updateVariant({ variantName: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color de Fondo</label>
                      <input
                        type="color"
                        value={currentVariant.bgColor || '#fbbf24'}
                        onChange={(e) => updateVariant({ bgColor: e.target.value })}
                        className="w-full h-10 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color de Borde</label>
                      <input
                        type="color"
                        value={currentVariant.borderColor || '#fbbf24'}
                        onChange={(e) => updateVariant({ borderColor: e.target.value })}
                        className="w-full h-10 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Borde Interno</label>
                      <input
                        type="color"
                        value={currentVariant.borderInternalColor || '#fbbf24'}
                        onChange={(e) => updateVariant({ borderInternalColor: e.target.value })}
                        className="w-full h-10 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color de Texto</label>
                    <input
                      type="color"
                      value={currentVariant.textColor || '#000000'}
                      onChange={(e) => updateVariant({ textColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                    <select
                      value={currentVariant.longLogoId || ''}
                      onChange={(e) => {
                        const logo = logos.find(l => l.id === e.target.value);
                        updateVariant({ longLogoId: e.target.value || null, longLogo: logo || null });
                      }}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sin logo</option>
                      {logos.map((logo) => (
                        <option key={logo.id} value={logo.id}>
                          {logo.name} ({logo.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pos X</label>
                      <input
                        type="number"
                        step="0.1"
                        value={currentVariant.posX}
                        onChange={(e) => updateVariant({ posX: parseFloat(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pos Y</label>
                      <input
                        type="number"
                        step="0.1"
                        value={currentVariant.posY}
                        onChange={(e) => updateVariant({ posY: parseFloat(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zoom</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={currentVariant.zoom}
                        onChange={(e) => updateVariant({ zoom: parseFloat(e.target.value) || 1 })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Debug JSON */}
          <div className="mt-8 bg-gray-800 rounded border p-4">
            <h3 className="font-semibold text-white mb-2">🔍 Debug JSON</h3>
            <pre className="text-green-400 text-xs overflow-x-auto">
              {JSON.stringify({
                currentCard: currentCard ? {
                  name: currentCard.name,
                  hp: currentCard.hp,
                  power: currentCard.power,
                  generation: currentCard.generation?.name,
                  expansion: currentCard.expansion?.name,
                  cardType: currentCard.cardType?.name,
                  classes: currentCard.classes.map(c => c.name),
                  affiliations: currentCard.affiliations.map(a => a.name),
                } : null,
                availableExpansions: availableExpansions.map(exp => exp.name),
                currentVariant: currentVariant ? {
                  variantName: currentVariant.variantName,
                  bgColor: currentVariant.bgColor,
                  borderColor: currentVariant.borderColor,
                  borderInternalColor: currentVariant.borderInternalColor,
                  textColor: currentVariant.textColor,
                  logo: currentVariant.longLogo?.name,
                  position: { x: currentVariant.posX, y: currentVariant.posY, zoom: currentVariant.zoom },
                } : null,
                state: { mode, isDirty }
              }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardLabPage;