import { 
  Generation, 
  Expansion, 
  CardType, 
  MoveType, 
  Class, 
  Affiliation, 
  Tag, 
  Texture, 
  Logo 
} from '@prisma/client';

export interface EditorData {
  generations: Generation[];
  expansions: Expansion[];
  cardTypes: CardType[];
  moveTypes: MoveType[];
  classes: Class[];
  affiliations: Affiliation[];
  tags: Tag[];
  textures: Texture[];
  logos: Logo[];
}

export interface EditorDataState extends EditorData {
  // Estados
  isLoading: boolean;
  error: string | null;
  currentGameId: string | null;
  
  // Acciones
  loadAllEditorData: (gameId: string) => Promise<void>;
  reset: () => void;
}

export const INITIAL_DATA: EditorData = {
  generations: [],
  expansions: [],
  cardTypes: [],
  moveTypes: [],
  classes: [],
  affiliations: [],
  tags: [],
  textures: [],
  logos: [],
};