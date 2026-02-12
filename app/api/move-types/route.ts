import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

export async function GET(request: NextRequest) {
  try {
    const moveTypes = await prisma.moveType.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(moveTypes);
  } catch (error) {
    console.error('Error fetching move types:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}