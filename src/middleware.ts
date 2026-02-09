import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // Enterprise Observability: Ensure every request has an ID
  // Vercel provides 'x-vercel-id', but having our own 'x-request-id' is standard
  if (!requestHeaders.has('x-request-id')) {
    requestHeaders.set('x-request-id', uuidv4());
  }

  // Security: CSP (Basic example, can be expanded)
  // requestHeaders.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:;");

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Echo the ID back to the client for debugging
  response.headers.set('x-request-id', requestHeaders.get('x-request-id') || '');

  return response;
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes) -> actually we WANT middleware on API routes for logging
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
