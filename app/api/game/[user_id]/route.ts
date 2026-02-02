import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { can } from "@/lib/permissions";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ user_id: string }> }
) {
    try {
        const { user_id } = await params;

        if (!user_id) {
            return NextResponse.json(
                { error: 'El user_id es requerido' },
                { status: 400 }
            );
        }

        // Verificar autenticación (más seguro que getSession)
        const supabase = await createClient();
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();

        if (userError || !authUser) {
            return NextResponse.json(
                { error: 'No autorizado. Debe iniciar sesión.' },
                { status: 401 }
            );
        }

        // Obtener datos del usuario logueado desde la base de datos
        const loggedUser = await prisma.user.findUnique({
            where: { id: authUser.id },
            include: { role: true }
        });

        if (!loggedUser) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        // Verificar permisos
        if (!can(loggedUser.role, 'games', 'readAllActiveByUser')) {
            return NextResponse.json(
                { error: 'No tienes permisos para realizar esta acción' },
                { status: 403 }
            );
        }

        // Verificar que el usuario solo pueda consultar sus propios juegos
        // (excepto si es admin)
        if (loggedUser.role.name !== 'ADMIN' && loggedUser.id !== user_id) {
            return NextResponse.json(
                { error: 'No puedes consultar los juegos de otro usuario' },
                { status: 403 }
            );
        }

        const games = await prisma.game.findMany({
            where: {
                users: {
                    some: {
                        userId: user_id
                    }
                }
            },
            orderBy: [
                { isActive: 'desc' }, // Activos primero
                { name: 'asc' }       // Luego por nombre
            ]
        });

        return NextResponse.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json(
            { error: 'Error al obtener los juegos' },
            { status: 500 }
        );
    }
}