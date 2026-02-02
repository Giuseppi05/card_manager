import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Game } from '@prisma/client';

interface GameState {
  currentGame: Game | null;
  setCurrentGame: (game: Game) => void;
  clearCurrentGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      currentGame: null,
      setCurrentGame: (game: Game) => set({ currentGame: game }),
      clearCurrentGame: () => set({ currentGame: null }),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);