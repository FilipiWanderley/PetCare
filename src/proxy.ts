import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function proxy(request: NextRequest) {
  // Proteger rotas de dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get('session');
    
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const session = await decrypt(sessionCookie.value);
      
      if (!session || session.role !== 'admin') {
        // Se não for admin, redireciona para home com possivelmente uma mensagem (query param)
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
