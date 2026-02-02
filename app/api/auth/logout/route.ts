import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        
        // Cerrar sesión en Supabase
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('Error during logout:', error);
            return NextResponse.json(
                { error: 'Error al cerrar sesión' },
                { status: 500 }
            );
        }

        // Crear respuesta exitosa
        const response = NextResponse.json({ 
            message: 'Sesión cerrada exitosamente' 
        });

        // Limpiar cookies de autenticación si las hay
        response.cookies.delete('supabase-auth-token');
        response.cookies.delete('sb-access-token');
        response.cookies.delete('sb-refresh-token');

        return response;

    } catch (error) {
        console.error('Error in logout endpoint:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}