import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    
    if (!gameId) {
      return NextResponse.json({ error: 'gameId is required' }, { status: 400 });
    }

    const affiliations = await prisma.affiliation.findMany({
      where: { gameId },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(affiliations);
  } catch (error) {
    console.error('Error fetching affiliations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}