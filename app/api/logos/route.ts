import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    let whereClause = {};
    
    if (type) {
      whereClause = { type: type };
    }

    const logos = await prisma.logo.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(logos);
  } catch (error) {
    console.error('Error fetching logos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}