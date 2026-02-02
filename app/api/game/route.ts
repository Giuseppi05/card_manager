import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { can } from "@/lib/permissions";

export async function POST(request: NextRequest) {
    try {
        // Obtener datos del body
        const { gameId, userId } = await request.json();

        if (!gameId || !userId) {
            return NextResponse.json(
                { error: 'gameId y userId son requeridos' },
                { status: 400 }
            );
        }

        // Verificar autenticación básica
        const supabase = await createClient();
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();

        if (userError || !authUser) {
            return NextResponse.json(
                { error: 'No autorizado. Debe iniciar sesión.' },
                { status: 401 }
            );
        }

        // Obtener datos del usuario con rol para verificar permisos
        const currentUser = await prisma.user.findUnique({
            where: { id: authUser.id },
            include: { role: true },
        });

        if (!currentUser) {
            return NextResponse.json(
                { error: 'Usuario no encontrado.' },
                { status: 404 }
            );
        }

        // Verificar permisos
        if (!can(currentUser.role, 'games', 'addToUser')) {
            return NextResponse.json(
                { error: 'No tienes permisos para agregar juegos a tu colección.' },
                { status: 403 }
            );
        }

        // Verificar que el usuario solo pueda agregar juegos a sí mismo
        // (excepto si es admin)
        if (currentUser.role.name !== 'ADMIN' && currentUser.id !== userId) {
            return NextResponse.json(
                { error: 'No puedes agregar juegos a otro usuario' },
                { status: 403 }
            );
        }

        // Verificar que el juego existe
        const game = await prisma.game.findUnique({
            where: { 
                id: gameId
            }
        });

        if (!game) {
            return NextResponse.json(
                { error: 'Juego no encontrado' },
                { status: 404 }
            );
        }

        // Verificar si el usuario ya tiene este juego
        const existingUserGame = await prisma.userGame.findFirst({
            where: {
                userId: userId,
                gameId: gameId
            }
        });

        if (existingUserGame) {
            return NextResponse.json(
                { error: 'Ya tienes este juego en tu colección' },
                { status: 409 }
            );
        }

        // Crear la relación UserGame
        const userGame = await prisma.userGame.create({
            data: {
                userId: userId,
                gameId: gameId
            },
            include: {
                game: true
            }
        });

        return NextResponse.json({
            message: 'Juego agregado exitosamente',
            userGame: userGame
        });

    } catch (error) {
        console.error('Error adding game to user:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
