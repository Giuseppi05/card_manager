// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Contraseña inválida" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Intentar login en Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Mensajes de error más amigables
      if (error.message.includes("Invalid login credentials")) {
        return NextResponse.json(
          { error: "Correo o contraseña incorrectos" },
          { status: 401 }
        );
      }

      if (error.message.includes("Email not confirmed")) {
        return NextResponse.json(
          { error: "Por favor confirma tu correo electrónico antes de iniciar sesión" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (!data.user || !data.session) {
      return NextResponse.json(
        { error: "Error al iniciar sesión" },
        { status: 500 }
      );
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: data.user.id },
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

      if (!user) {
        console.error("Usuario existe en Supabase pero no en Prisma:", data.user.id);
        return NextResponse.json(
          { error: "Error de sincronización. Por favor contacta soporte." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Sesión iniciada correctamente",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.name,
        },
      });

    } catch (prismaError) {
      console.error("Error al verificar usuario en Prisma:", prismaError);
      // Aún así permitimos el login si Supabase Auth funcionó
      return NextResponse.json({
        success: true,
        message: "Sesión iniciada correctamente",
      });
    }

  } catch (error: any) {
    console.error("ERROR GENERAL EN LOGIN:", error);
    return NextResponse.json(
      { error: "Error interno del servidor. Por favor intenta de nuevo." },
      { status: 500 }
    );
  }
}