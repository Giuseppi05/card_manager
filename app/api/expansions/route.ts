import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    const generationId = searchParams.get('generationId');
    
    let whereClause = {};
    
    if (generationId) {
      whereClause = { generationId: generationId };
    } else if (gameId) {
      // Si solo se pasa gameId, buscar expansiones de todas las generaciones de ese juego
      whereClause = {
        generation: {
          gameId: gameId
        }
      };
    }

    const expansions = await prisma.expansion.findMany({
      where: whereClause,
      include: {
        generation: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(expansions);
  } catch (error) {
    console.error('Error fetching expansions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}