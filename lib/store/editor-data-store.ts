import { create } from 'zustand';
import { Generation, Expansion, CardType, MoveType, Class, Affiliation, Tag, Texture, Logo } from '@prisma/client';

interface EditorDataState {
  // Estados de carga
  isLoading: boolean;
  error: string | null;
  
  // Datos completos
  generations: Generation[];
  expansions: Expansion[];
  cardTypes: CardType[];
  moveTypes: MoveType[];
  classes: Class[];
  affiliations: Affiliation[];
  tags: Tag[];
  textures: Texture[];
  logos: Logo[];
  
  // Acciones
  loadAllEditorData: (gameId: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEditorDataStore = create<EditorDataState>((set, get) => ({
  // Estado inicial
  isLoading: false,
  error: null,
  
  // Datos vacíos inicialmente
  generations: [],
  expansions: [],
  cardTypes: [],
  moveTypes: [],
  classes: [],
  affiliations: [],
  tags: [],
  textures: [],
  logos: [],
  
  // Cargar todos los datos del editor con Promise.all
  loadAllEditorData: async (gameId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const [
        generationsRes,
        expansionsRes,
        cardTypesRes,
        moveTypesRes,
        classesRes,
        affiliationsRes,
        tagsRes,
        texturesRes,
        logosRes
      ] = await Promise.all([
        fetch(`/api/generations?gameId=${gameId}`),
        fetch(`/api/expansions?gameId=${gameId}`),
        fetch('/api/card-types'),
        fetch('/api/move-types'),
        fetch('/api/classes'),
        fetch('/api/affiliations'),
        fetch('/api/tags'),
        fetch('/api/textures'),
        fetch('/api/logos?type=long')
      ]);
      
      const [
        generations,
        expansions,
        cardTypes,
        moveTypes,
        classes,
        affiliations,
        tags,
        textures,
        logos
      ] = await Promise.all([
        generationsRes.json(),
        expansionsRes.json(),
        cardTypesRes.json(),
        moveTypesRes.json(),
        classesRes.json(),
        affiliationsRes.json(),
        tagsRes.json(),
        texturesRes.json(),
        logosRes.json()
      ]);
      
      set({
        generations,
        expansions,
        cardTypes,
        moveTypes,
        classes,
        affiliations,
        tags,
        textures,
        logos,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error cargando datos del editor',
        isLoading: false 
      });
    }
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));