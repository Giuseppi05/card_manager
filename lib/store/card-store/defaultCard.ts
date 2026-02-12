import { Card, Move, CardVariant, Class, Affiliation, Tag, Generation, Expansion, CardType, MoveType, Logo, Texture } from "@prisma/client";

// Función para crear defaultCard con datos del editor store
export const createDefaultCard = (editorData: {
  generations: Generation[];
  expansions: Expansion[];
  cardTypes: CardType[];
  moveTypes: MoveType[];
  classes: Class[];
  affiliations: Affiliation[];
  tags: Tag[];
  textures: Texture[];
  logos: Logo[];
}) => {
  // Seleccionar automáticamente según las reglas:
  const selectedGeneration = editorData.generations[editorData.generations.length - 1] || null; // última
  const selectedExpansion = editorData.expansions[editorData.expansions.length - 1] || null; // última
  const selectedCardType = editorData.cardTypes.find(ct => ct.name === 'expansion') || null; // "expansion"
  const selectedMoveType = editorData.moveTypes.find(mt => mt.name === 'active-atk') || null; // "active-atk"
  const selectedClasses = editorData.classes[0] || null; // primera
  const selectedAffiliations = null; // ninguna
  const selectedLogo = editorData.logos.find(logo => logo.name === 'normal') || null; // "normal" con type="long"
  return {
    // Campos básicos
    id: '',
    name: 'Character Name',
    hp: 100,
    power: 1,
    isActive: false,
    isVisible: false,
    
    // IDs seleccionados automáticamente según las reglas
    expansionId: selectedExpansion?.id || '',
    typeId: selectedCardType?.id || '',
    baseCardId: null,
    
    // Relaciones con elementos seleccionados
    classes: selectedClasses ? [selectedClasses] : [],
    affiliations: selectedAffiliations ? [selectedAffiliations] : [],
    isAffiliationMarked: false,
    tags: [] as Tag[], // No se selecciona ninguno
    
    // Movimientos con tipo seleccionado (active-atk)
    moves: [
      {
        id: '',
        name: 'Movement Name',
        damage: 100,
        description: 'Movement Description',
        typeId: selectedMoveType?.id || '',
        cardId: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '',
        name: 'Movement Name',
        damage: 100,
        description: 'Movement Description',
        typeId: selectedMoveType?.id || '',
        cardId: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ] as Move[],
    
    // Variante visual por defecto con logo seleccionado
    variants: [
      {
        id: '',
        cardId: '',
        variantName: 'default',
        imageUrl: '/placeholders/card-character-placeholder.jpg',
        fullRenderUrl: '',
        textureId: null, // No se selecciona ninguna textura
        longLogoId: selectedLogo?.id || null, // Logo "normal" con type="long"
        bgColor: '#fbbf24',
        borderColor: '#f59e0b',
        borderInternalColor: '#f59e0b',
        textColor: '#000000',
        posX: 0,
        posY: 0,
        zoom: 1,
        isDefault: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ] as CardVariant[],
    
    // Timestamps
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

// DefaultCard básico para cuando no hay datos cargados aún
const DefaultCard = {
  id: '',
  name: 'Character Name',
  hp: 100,
  power: 1,
  isActive: false,
  isVisible: false,
  expansionId: '',
  typeId: '',
  baseCardId: null,
  classes: [] as Class[],
  affiliations: [] as Affiliation[],
  isAffiliationMarked: false,
  tags: [] as Tag[],
  moves: [] as Move[],
  variants: [] as CardVariant[],
  createdAt: new Date(),
  updatedAt: new Date()
};

export default DefaultCard;