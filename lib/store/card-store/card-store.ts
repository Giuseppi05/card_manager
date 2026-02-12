import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Card, Move, CardVariant, Class, Affiliation, Tag } from '@prisma/client';
import DefaultCard, { createDefaultCard } from './defaultCard';

type CardForEditor = {
  id: string;
  name: string;
  hp: number | null;
  power: number;
  isActive: boolean;
  isVisible: boolean;
  expansionId: string;
  typeId: string;
  baseCardId: string | null;
  classes: Class[];
  affiliations: Affiliation[];
  isAffiliationMarked: boolean;
  tags: Tag[];
  moves: Move[];
  variants: CardVariant[];
  createdAt: Date;
  updatedAt: Date;
};

interface GameState {
  currentCard: CardForEditor
  setCurrentCard: (card: CardForEditor) => void
  updateCardField: (field: keyof CardForEditor, value: any) => void
  
  // Inicializar carta con datos del editor store
  initializeCardWithEditorData: (editorData: any) => void
  
  resetCard: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      currentCard: DefaultCard,
      
      setCurrentCard: (card) => set({ currentCard: card }),
      
      updateCardField: (field, value) => set((state) => ({
        currentCard: { ...state.currentCard, [field]: value, updatedAt: new Date() }
      })),
      
      // Crear carta con datos del editor store
      initializeCardWithEditorData: (editorData) => {
        const newCard = createDefaultCard(editorData);
        set({ currentCard: newCard });
      },
      
      resetCard: () => set({ currentCard: { ...DefaultCard, createdAt: new Date(), updatedAt: new Date() } })
    }),
    {
      name: 'card-edited',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);