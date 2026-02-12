import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

export async function GET(request: NextRequest) {
  try {
    const cardTypes = await prisma.cardType.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(cardTypes);
  } catch (error) {
    console.error('Error fetching card types:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}