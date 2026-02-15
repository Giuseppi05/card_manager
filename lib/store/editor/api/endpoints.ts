export const API_ENDPOINTS = {
  generations: (gameId: string) => `/api/generations?gameId=${gameId}`,
  expansions: (gameId: string) => `/api/expansions?gameId=${gameId}`,
  classes: (gameId: string) => `/api/classes?gameId=${gameId}`,
  affiliations: (gameId: string) => `/api/affiliations?gameId=${gameId}`,
  logos: (gameId: string) => `/api/logos?gameId=${gameId}&type=long`,
  tags: (gameId: string) => `/api/tags?gameId=${gameId}`,
  cardTypes: '/api/card-types',
  moveTypes: '/api/move-types',
  textures: '/api/textures',
} as const;