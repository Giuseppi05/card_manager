// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Validaciones básicas
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
    }

    // Verificar rol por defecto
    const defaultRole = await prisma.role.findFirst({ where: { name: "USER" } });
    if (!defaultRole) {
      return NextResponse.json({ error: "Configuración del sistema incorrecta" }, { status: 500 });
    }

    // Verificar si el email ya existe en Prisma ANTES de crear en Supabase
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    const existingName = await prisma.user.findUnique({ where: { name } });
    
    if (existingEmail) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
    }
    
    if (existingName) {
      return NextResponse.json({ error: "El nombre de usuario ya existe" }, { status: 409 });
    }

    const supabase = await createClient();

    // 1. Crear en Supabase Auth SIN confirmación de email
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { name },
        // Quita emailRedirectTo si no quieres confirmación
      },
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
      }
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
    }

    // 2. Crear en Prisma con manejo de rollback
    try {
      const newUser = await prisma.user.create({
        data: {
          id: authData.user.id,
          email: authData.user.email!,
          name: name,
          roleId: defaultRole.id,
        },
      });

      return NextResponse.json({ 
        success: true, 
        user: newUser,
        message: "¡Cuenta creada exitosamente! Redirigiendo..."
      });

    } catch (prismaError: any) {
      console.error("Error en Prisma, intentando rollback:", prismaError);
      
      try {
        const adminClient = await createClient();
        await adminClient.auth.admin.deleteUser(authData.user.id);
      } catch (rollbackError) {
        console.error("Error en rollback:", rollbackError);
      }

      if (prismaError.code === 'P2002') {
        const target = prismaError.meta?.target as string[] | undefined;
        
        if (target?.includes('email')) {
          return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
        }
        if (target?.includes('name')) {
          return NextResponse.json({ error: "El nombre de usuario ya existe" }, { status: 409 });
        }
      }

      return NextResponse.json({ 
        error: "Error al guardar usuario. Intenta de nuevo." 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("ERROR GENERAL:", error);
    return NextResponse.json({ 
      error: "Error del servidor. Intenta más tarde." 
    }, { status: 500 });
  }
}