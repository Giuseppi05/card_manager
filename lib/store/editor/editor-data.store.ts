import { create } from 'zustand';
import { EditorDataState, INITIAL_DATA } from './types/editor-data.types';
import { API_ENDPOINTS } from './api/endpoints';

export const useEditorDataStore = create<EditorDataState>((set, get) => ({
  ...INITIAL_DATA,
  isLoading: false,
  error: null,
  currentGameId: null,
  
  loadAllEditorData: async (gameId: string) => {
    const { currentGameId, isLoading } = get();
    
    // Evitar recargar si ya tenemos los datos para el mismo gameId
    if (currentGameId === gameId && !isLoading) {
      return;
    }
    
    set({ isLoading: true, error: null, currentGameId: gameId });
    
    try {
      const responses = await Promise.all([
        fetch(API_ENDPOINTS.generations(gameId)),
        fetch(API_ENDPOINTS.expansions(gameId)),
        fetch(API_ENDPOINTS.classes(gameId)),
        fetch(API_ENDPOINTS.affiliations(gameId)),
        fetch(API_ENDPOINTS.tags(gameId)),
        fetch(API_ENDPOINTS.logos(gameId)),
        fetch(API_ENDPOINTS.cardTypes),
        fetch(API_ENDPOINTS.moveTypes),
        fetch(API_ENDPOINTS.textures),
      ]);
      
      // Verificar que todas las respuestas sean exitosas
      const failedResponse = responses.find(res => !res.ok);
      if (failedResponse) {
        throw new Error(`Error en la API: ${failedResponse.status} ${failedResponse.statusText}`);
      }
      
      const [
        generations,
        expansions,
        classes,
        affiliations,
        tags,
        logos,
        cardTypes,
        moveTypes,
        textures
      ] = await Promise.all(responses.map(res => res.json()));
      
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
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({ 
        ...INITIAL_DATA,
        error: error instanceof Error ? error.message : 'Error cargando datos del editor',
        isLoading: false,
        currentGameId: null,
      });
    }
  },
  
  reset: () => set({
    ...INITIAL_DATA,
    isLoading: false,
    error: null,
    currentGameId: null,
  }),
}));