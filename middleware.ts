// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createMiddlewareClient(request, response)
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // Definir rutas por tipo
  const publicRoutes = ['/']
  const authRoutes = ['/auth']
  const protectedRoutes = ['/dashboard', '/cards']
  const adminRoutes = ['/admin']

  // Si intenta acceder a ruta de auth estando autenticado → home
  if (user && authRoutes.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Si no está autenticado e intenta acceder a ruta protegida → auth
  if (!user && protectedRoutes.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Para rutas admin - VERIFICAR ROL
  if (adminRoutes.some(route => path.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    try {
      const userDataRes = await fetch(
        `${request.nextUrl.origin}/api/user/${user.id}`,
        {
          headers: {
            Cookie: request.headers.get('cookie') || '',
          },
        }
      )

      if (userDataRes.ok) {
        const userData = await userDataRes.json()
        
        // Si NO es admin, redirigir
        if (userData.user.role !== 'ADMIN') {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      } else {
        // Si falla la verificación, redirigir a dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      console.error('Error verificando rol de admin:', error)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}