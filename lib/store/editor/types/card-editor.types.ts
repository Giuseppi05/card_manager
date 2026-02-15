import { 
  Card, 
  CardVariant, 
  Move, 
  Class, 
  Affiliation, 
  Tag, 
  Expansion, 
  CardType, 
  Logo, 
  Texture, 
  MoveType, 
  Generation 
} from '@prisma/client';
import { EditorData } from './editor-data.types';

export type CardWithRelations = {
  id?: string;
  name: string;
  hp: number | null;
  power: number;
  isActive: boolean;
  isVisible: boolean;
  
  generationId: string;
  generation?: Generation;
  
  expansionId: string;
  expansion?: Expansion;
  
  typeId: string;
  cardType?: CardType;
  
  classes: Class[];
  affiliations: Affiliation[];
  isAffiliationMarked: boolean;
  
  tags: Tag[];
  moves: MoveWithRelations[];
  
  baseCardId: string | null;
  baseCard?: Card | null;
  levelUpCards: Card[];
};

export type MoveWithRelations = {
  id?: string;
  name: string;
  damage: number | null;
  description: string | null;
  expandedDescription: string | null;
  
  typeId: string;
  type?: MoveType;
  
  cardId?: string;
  tags: Tag[];
};

export type VariantWithRelations = {
  id?: string;
  cardId?: string;
  variantName: string;
  
  imageUrl: string;
  fullRenderUrl: string;
  
  textureId: string | null;
  texture?: Texture | null;
  
  longLogoId: string | null;
  longLogo?: Logo | null;
  
  bgColor: string | null;
  borderColor: string | null;
  borderInternalColor: string | null;
  textColor: string | null;
  
  posX: number;
  posY: number;
  zoom: number;
  
  isDefault: boolean;
  isActive: boolean;
};

export interface CardEditorState {
  // Estados
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
  mode: 'create' | 'edit-card' | 'create-variant' | 'edit-variant';
  
  // Datos actuales
  currentCard: CardWithRelations | null;
  currentVariant: VariantWithRelations | null;
  allVariants: VariantWithRelations[];
  currentVariantIndex: number;
  
  // Acciones
  createNewCard: (editorData: EditorData) => void;
  loadCard: (cardId: string, variantId?: string) => Promise<void>;
  updateCard: (updates: Partial<CardWithRelations>) => void;
  updateVariant: (updates: Partial<VariantWithRelations>) => void;
  setCurrentVariant: (index: number) => void;
  updateGeneration: (generationId: string, editorData: Partial<EditorData>) => void;
  
  // Utils
  markDirty: () => void;
  markClean: () => void;
  reset: () => void;
}