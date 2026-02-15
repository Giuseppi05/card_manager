import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    const category = searchParams.get('category');
    
    if (!gameId) {
      return NextResponse.json({ error: 'gameId is required' }, { status: 400 });
    }
    
    let whereClause: any = { gameId };
    
    if (category) {
      whereClause.category = category;
    }

    const tags = await prisma.tag.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}