import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET(request: NextRequest) {
    try {
        const games = await prisma.game.findMany();
        return NextResponse.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json(
            { error: 'Error al obtener los juegos' },
            { status: 500 }
        );
    }
}