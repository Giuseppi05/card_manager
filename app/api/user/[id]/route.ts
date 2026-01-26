import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    
    // Verificar que el usuario esté autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { id: requestedUserId } = await params;
    
    // Obtener datos del usuario actual
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { role: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Si no es admin y está pidiendo info de otro usuario, denegar
    if (currentUser.role.name !== "ADMIN" && requestedUserId !== user.id) {
      return NextResponse.json(
        { error: "No tienes permiso para ver esta información" },
        { status: 403 }
      );
    }

    // Obtener datos del usuario solicitado
    const userData = await prisma.user.findUnique({
      where: { id: requestedUserId },
      select: {
        id: true,
        email: true,
        name: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role.name,
      },
    });

  } catch (error: any) {
    console.error("ERROR AL OBTENER USUARIO:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}