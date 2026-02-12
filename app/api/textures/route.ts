import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

export async function GET(request: NextRequest) {
  try {
    const textures = await prisma.texture.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(textures);
  } catch (error) {
    console.error('Error fetching textures:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}