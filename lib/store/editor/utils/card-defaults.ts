import { 
  CardType, 
  MoveType, 
  Logo, 
  Generation, 
  Expansion 
} from '@prisma/client';
import { 
  CardWithRelations, 
  VariantWithRelations, 
  MoveWithRelations 
} from '../types/card-editor.types';
import { EditorData } from '../types/editor-data.types';

export const createDefaultCard = (editorData: EditorData): CardWithRelations => {
  // Seleccionar primera generación disponible (default)
  const firstGeneration = editorData.generations[0];
  if (!firstGeneration) {
    throw new Error('No hay generaciones disponibles');
  }
  
  // Filtrar expansiones de esa generación y seleccionar primera
  const availableExpansions = editorData.expansions.filter(
    (exp: Expansion) => exp.generationId === firstGeneration.id
  );
  
  const firstExpansion = availableExpansions[0];
  if (!firstExpansion) {
    throw new Error('No hay expansiones disponibles para la generación seleccionada');
  }
  
  // Buscar cardType "expansion" o tomar el primero
  const cardType = editorData.cardTypes.find((ct: CardType) => 
    ct.name.toLowerCase().includes('expansion')
  ) || editorData.cardTypes[0];
  
  if (!cardType) {
    throw new Error('No hay tipos de carta disponibles');
  }
  
  // Añadir primera clase disponible
  const firstClass = editorData.classes[0];
  if (!firstClass) {
    throw new Error('No hay clases disponibles');
  }
  
  // Buscar moveType "ataque-activo" o tomar el primero
  const moveType = editorData.moveTypes.find((mt: MoveType) => 
    mt.name.toLowerCase().includes('ataque-activo') || mt.name.toLowerCase().includes('activo')
  ) || editorData.moveTypes[0];
  
  if (!moveType) {
    throw new Error('No hay tipos de movimiento disponibles');
  }
  
  return {
    name: "Character Name",
    hp: 100,
    power: 1,
    isActive: false,
    isVisible: false,
    
    generationId: firstGeneration.id,
    generation: firstGeneration,
    
    expansionId: firstExpansion.id,
    expansion: firstExpansion,
    
    typeId: cardType.id,
    cardType: cardType,
    
    classes: [firstClass],
    affiliations: [],
    isAffiliationMarked: false,
    
    tags: [],
    moves: createDefaultMoves(moveType),
    
    baseCardId: null,
    baseCard: null,
    levelUpCards: []
  };
};

export const createDefaultVariant = (editorData: EditorData): VariantWithRelations => {
  // Buscar logo "default"
  const defaultLogo = editorData.logos.find((logo: Logo) => 
    logo.name.toLowerCase() === 'default'
  ) || editorData.logos[0];
  
  return {
    variantName: 'default',
    
    imageUrl: '/placeholders/card-character-placeholder.jpg',
    fullRenderUrl: '',
    
    textureId: null,
    texture: null,
    
    longLogoId: defaultLogo?.id || null,
    longLogo: defaultLogo || null,
    
    bgColor: "#fbbf24",
    borderColor: "#fbbf24",
    borderInternalColor: "#fbbf24",
    textColor: "#000000",
    
    posX: 0,
    posY: 0,
    zoom: 1,
    
    isDefault: true,
    isActive: true,
  };
};

export const createDefaultMoves = (moveType: MoveType): MoveWithRelations[] => [
  {
    name: 'Movement Name',
    damage: 100,
    description: "movement description",
    expandedDescription: "movement exact description",
    typeId: moveType.id,
    type: moveType,
    tags: []
  },
  {
    name: 'Movement Name',
    damage: 100,
    description: "movement description",
    expandedDescription: "movement exact description",
    typeId: moveType.id,
    type: moveType,
    tags: []
  },
];

export const filterExpansionsByGeneration = (
  expansions: Expansion[], 
  generationId: string
): Expansion[] => {
  return expansions.filter(exp => exp.generationId === generationId);
};