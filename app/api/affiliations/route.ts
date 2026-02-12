import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

export async function GET(request: NextRequest) {
  try {
    const affiliations = await prisma.affiliation.findMany({
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