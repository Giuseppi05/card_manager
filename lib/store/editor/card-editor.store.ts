import { create } from 'zustand';
import { Generation, Expansion } from '@prisma/client';
import { CardEditorState } from './types/card-editor.types'; 
import { EditorData } from './types/editor-data.types';
import { 
  createDefaultCard, 
  createDefaultVariant, 
  filterExpansionsByGeneration 
} from './utils/card-defaults';

export const useCardEditorStore = create<CardEditorState>((set, get) => ({
  // Estado inicial
  isLoading: false,
  error: null,
  isDirty: false,
  mode: 'create',
  currentCard: null,
  currentVariant: null,
  allVariants: [],
  currentVariantIndex: 0,
  
  createNewCard: (editorData) => {
    try {
      const newCard = createDefaultCard(editorData);
      const newVariant = createDefaultVariant(editorData);
      
      set({
        currentCard: newCard,
        currentVariant: newVariant,
        allVariants: [newVariant],
        currentVariantIndex: 0,
        mode: 'create',
        isDirty: false,
        error: null,
      });
      
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error creando carta por defecto',
        currentCard: null,
        currentVariant: null,
      });
    }
  },
  
  loadCard: async (cardId: string, variantId?: string) => {
    // TODO: Implementar carga de carta existente
    set({ isLoading: true });
    // ... lógica de carga
    set({ isLoading: false });
  },
  
  updateCard: (updates) => {
    const { currentCard } = get();
    if (!currentCard) return;
    
    set({
      currentCard: { ...currentCard, ...updates },
      isDirty: true,
    });
  },
  
  updateVariant: (updates) => {
    const { currentVariant, allVariants, currentVariantIndex } = get();
    if (!currentVariant) return;
    
    const updatedVariant = { ...currentVariant, ...updates };
    const updatedVariants = [...allVariants];
    updatedVariants[currentVariantIndex] = updatedVariant;
    
    set({
      currentVariant: updatedVariant,
      allVariants: updatedVariants,
      isDirty: true,
    });
  },
  
  setCurrentVariant: (index) => {
    const { allVariants } = get();
    if (index >= 0 && index < allVariants.length) {
      set({
        currentVariant: allVariants[index],
        currentVariantIndex: index,
      });
    }
  },
  
  updateGeneration: (generationId, editorData) => {
    const { currentCard } = get();
    if (!currentCard) return;
    
    // Buscar la generación seleccionada
    const generation = editorData.generations?.find((gen: Generation) => gen.id === generationId);
    
    // Filtrar expansiones de esa generación y seleccionar primera
    const availableExpansions = editorData.expansions ? 
      filterExpansionsByGeneration(editorData.expansions, generationId) : [];
    const firstExpansion = availableExpansions[0] || null;
    
    // Actualizar carta
    set({
      currentCard: {
        ...currentCard,
        generationId,
        generation,
        expansionId: firstExpansion?.id || '',
        expansion: firstExpansion
      },
      isDirty: true,
    });
  },
  
  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),
  
  reset: () => set({
    currentCard: null,
    currentVariant: null,
    allVariants: [],
    currentVariantIndex: 0,
    isDirty: false,
    error: null,
    mode: 'create',
  }),
}));